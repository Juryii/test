var app = new Vue({
  el: '#app',
  data: {
    page: 1,
    message: 'hello',
    beers: null,
    showBtn: true,
    name: '',
    img: '',
    description: '',
    brewers_tips: '',
    id: '',
    edit: false,
    loading: false,
    msgBtn: 'Show Text'
  },
  mounted(){
   axios.get('https://api.punkapi.com/v2/beers?page=1&limit=25').then(response => (this.beers = response.data))
  },
  computed: {
    textBtn(){
      if(!loading){
        msgBtn = 'Show Text'
      } else {
        msgBtn = 'Loading'
      }
    }
  },
  methods: {
    nextPage(){
      this.loading = true;
      this.page++;
      axios.get('https://api.punkapi.com/v2/beers?page='+this.page+'&limit=25')
        .then(function (response) {
          console.log(response.data.length);
          response.data.forEach(function(item, array) {
            app.beers.push(item);
          });
          if(response.data.length == 0 || response.data == ''){
            app.showBtn = false;
          }
        }).finally(() => (this.loading = false));
    },
    deletePost(beer){
      let index = this.beers.indexOf(beer);
      if(index> -1){
        return this.beers.splice(index, 1);
      }
    },
    edditPost(beer){
      this.edit = true;
      this.id = beer.id;
      this.name = beer.name;
      this.img= beer.image_url;
      this.description = beer.description;
      this.brewers_tips = beer.brewers_tips;
    },
    editApply(){

      let findBeer = this.beers.find(item => item.id = this.id);
      console.log(findBeer);

      findBeer.name = this.name;
      findBeer.image_url = this.img;
      findBeer.description = this.description;
      findBeer.brewers_tips = this.brewers_tips;
      console.log(findBeer);

      this.name = '';
      this.img= '';
      this.description = '';
      this.brewers_tips = '';
      this.id = '';
      this.edit = false;
      console.log(findBeer);

    }
  }

});