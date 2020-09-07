import React from "react";
import List from "@material-ui/core/List";
import SkeletonAnimation from "./skeleton";
import Hit from "./hit";

class Hits extends React.Component {
  constructor(props) {
    super(props);

    const defaultValue = {
      hits: [],
      deletedHits: [],
      numberOfHits: 20,
    };

    this.state = JSON.parse(localStorage.getItem("hitsState"))
      ? JSON.parse(localStorage.getItem("hitsState"))
      : defaultValue;
  }

  /**
   * Calls the API to get hits/posts/histories
   *
   * @param {Number} limit 5 < limit < 200
   */
  callAPI(limit) {
    fetch(`http://localhost:4000/api/hits?limit=${limit}`)
      .then((response) => response.json())
      .then((hits) => {
        // Checks if the new request brings items that were deleted
        const deletedHits = this.state.deletedHits.slice();
        let hitsNotPrevDeleted = [];
        for (let i = 0; i < hits.length; i++) {
          if (!deletedHits.some((x) => x._id === hits[i]._id))
            hitsNotPrevDeleted.push(hits[i]);
        }

        this.setState({ hits: hitsNotPrevDeleted });

        // Uses local storage to keep the state 'permanent'
        const prevState = this.setState;
        this.setState = function () {
          let arguments0 = arguments[0];
          let arguments1 = () => (
            arguments[1],
            localStorage.setItem("hitsState", JSON.stringify(this.state))
          );
          prevState.bind(this)(arguments0, arguments1);
        };
      })
      .catch((error) => console.log("error", error));
  }

  componentDidMount() {
    // 1sec delay so the skeleton can be seen, just for the ux
    setTimeout(() => this.callAPI(this.state.numberOfHits), 1000);
  }

  /**
   * Checks the array of hits and delete it from state
   * @param {Hit} hit
   */
  onDelete = (hit) => {
    let hits = this.state.hits.slice();
    const index = hits.indexOf(hit);
    if (index > -1) {
      hits.splice(index, 1);
      this.setState({ hits });
    }

    // checks if the deleted item is contained in the deleted hits
    let deletedHits = this.state.deletedHits.slice();
    const existsInDeletedHits = deletedHits.some((x) => x._id === hit._id);
    if (!existsInDeletedHits) {
      deletedHits.push(hit);
      this.setState({ deletedHits });
    }

    // if there are no more hits, a new request is made to the api
    // to fetch 20 more hits or posts
    if (this.state.hits.length - 1 === 0) {
      const numberOfHits = this.state.numberOfHits;
      let newNumberOfHits = numberOfHits + 20;
      this.setState({ numberOfHits: newNumberOfHits });
      this.callAPI(newNumberOfHits);
    }
  };

  /**
   * Opens a new tab with the url of the hit/post/history
   * @param {Hit} hit
   */
  onRowClick = (hit) => {
    console.log(hit.url, hit.story_url);
    const url = hit.url !== null ? hit.url : hit.story_url;
    window.open(url, "_blank", "noopener");
  };

  /**
   * Verify if the title is valid, otherwise, skips the hit/post/history
   * @param {Hit} hit
   */
  verifyTitle(hit) {
    return hit.story_title || hit.title;
  }

  render() {
    if (this.state.hits.length === 0) {
      return <SkeletonAnimation></SkeletonAnimation>;
    }
    return (
      <List>
        {this.state.hits.map((hit) => {
          if (this.verifyTitle(hit)) {
            return (
              <Hit
                key={`list-item-${hit._id}`}
                onRowClick={this.onRowClick}
                onDelete={this.onDelete}
                hit={hit}
              ></Hit>
            );
          } else {
            return "";
          }
        })}
      </List>
    );
  }
}

export default Hits;
