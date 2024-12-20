const UrlParser = {
    parseActiveUrlWithCombiner() {
      const url = window.location.hash.slice(1).toLowerCase();
      const splittedUrl = this._urlSplitter(url);
      return this._urlCombiner(splittedUrl);
    },
  
    parseActiveUrlWithoutCombiner() {
      const url = window.location.hash.slice(1).toLowerCase();
      return this._urlSplitter(url);
    },
  
    _urlSplitter(url) {
      const urlSplits = url.split('/');
      return {
        resource: urlSplits[1] || null,
        id: urlSplits[2] || null,
      };
    },
  
    _urlCombiner(splittedUrl) {
      return (
        (splittedUrl.resource ? `/${splittedUrl.resource}` : '/') +
        (splittedUrl.id ? '/:id' : '')
      );
    },
  };
  
  export default UrlParser;