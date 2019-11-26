import React, {Component} from 'react';

class ProductPage extends Component {
    state = {
      type: "",
      selectedOption: "",
      error: null,
      isLoaded: false,
      products: []
    }
  
    //this function sets in state the selected user category
    //it also makes an API call to fetch category
    handleChange = (selectedOption) => {
      this.setState({
        type: selectedOption.value,
        selectedOption: selectedOption.value
      }, () => {
          this.fetchCategory()
      })
    }
  
    //callback that fetches api endpoint
    fetchCategory = () => {
      let endpoint;
      // if (this.state.type === "All" || this.state.type === ""){
         endpoint = `/api/products`
      // } else {
      //   endpoint = `/api/productfilter?category=${this.state.selectedOption}`
      // }
      fetch(endpoint)
      // .then(res => console.log(res))
      .then(res => res.json())
      .then((data)=>{
          this.setState({
            products: data
        });
      },
      (error) => 
          this.setState({
            isLoaded: true,
            error
          })
      
      )
    }
  
    //will fetch products from the api and then set it in state
    componentDidMount(){
      this.fetchCategory();
    }
    render(){
      return(
        <React.Fragment>
        <div className="grid">
           {this.state.products.map(p => 
           <div className="grid-item">
           <img className="grid-image"src={`assets/img/${p.product_img}`} alt="{p.name}"/>
           <p className="grid-item-name">
           { p.product_name }
           </p>
           <p className="grid-description">
           { p.product_description}
           </p>
           {/* <Button className="price"> */}
           ${p.price}
           {/* </Button> */}
           
           </div>)
           }
        </div>
        </React.Fragment>
        
      );
    }
  }
  
  export default ProductPage;