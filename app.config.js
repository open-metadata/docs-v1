// A global class to store the search index creation status
class SearchIndexCreation {
  status = false;

  updateSearchIndexCreationStatus = (value) => {
    this.status = value;
  };

  getSearchIndexCreationStatus = () => this.status;
}

const searchIndexCreation = new SearchIndexCreation();

export default searchIndexCreation;
