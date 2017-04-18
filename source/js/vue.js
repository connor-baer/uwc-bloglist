/**
 * Vue Instance
 */
new Vue( {
  el: '#app',
  delimiters: [ '[[', ']]' ],
  data: {
    search: '',
    blogs: [],
  },
  mounted() {
    var self = this;

    function getData( url, callback ) {

      Vue.http.get( url ).then( response => {
        self.$data.blogs = response.body.data.reduce( function ( coll, item ) {
          coll.push( item );
          return coll;
        }, self.$data.blogs );

        let nextUrl = response.body.meta.pagination.links.next;

        if ( nextUrl ) {
          getData( nextUrl, callback );
        } else {
          callback();
        }
      }, response => {
        alertify
          .closeLogOnClick( true )
          .error( 'Couldn’t fetch data. ' + response.statusText );
      } );
    }

    getData( '/api/blogs.json', function () {
      console.log( 'All blogs fetched.' );
    } );
  },
  computed: {
    filteredBlogs() {
      var self = this;

      let filterData = this.blogs.filter( function ( blog ) {
        return blog.firstName.toLowerCase().indexOf( self.search.toLowerCase() ) > -1 || blog.college.toLowerCase().indexOf( self.search.toLowerCase() ) > -1 || blog.year.toLowerCase().indexOf( self.search.toLowerCase() ) > -1 || blog.countries.toLowerCase().indexOf( self.search.toLowerCase() ) > -1 || blog.languages.toLowerCase().indexOf( self.search.toLowerCase() ) > -1;
      } );

      function sortColleges( a, b ) {
        const criterionA = a.college.toUpperCase();
        const criterionB = b.college.toUpperCase();

        let comparison = 0;

        if ( criterionA > criterionB ) {
          comparison = 1;
        } else if ( criterionA < criterionB ) {
          comparison = -1;
        }
        return comparison;
      }

      return _.chain( filterData )
        .groupBy( 'college' )
        .toPairs()
        .map( function ( pair ) {
          return _.zipObject( [ 'college', 'blogs' ], pair );
        } )
        .value().sort( sortColleges );
    }
  }
} );