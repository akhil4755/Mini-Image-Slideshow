import React, { Component } from 'react';
import './App.css';


 const initialstate = {
      imageURL: '',
      images: [],

      file: null,
      position:'0',
      descvalue:'',
      url : 'abcdefg',
      temp : false
    };

class App extends Component {

  constructor() {
      super()
      this.state = initialstate
  }

handleUploadImage = (e) =>
{

  e.preventDefault();
  let file = this.state.file
  let newurl = file && URL.createObjectURL(file);

    let img = [{
      file : file,
      alt_name : ' ',
      description: this.state.descvalue,
      position : this.state.position,
      img_url : newurl
    }]

    let flag=0;

    if(this.state.images.length === 0)
    {
      this.setState({images:img});
    }
    else 
    {
      let arr = this.state.images;

        for(let i=0; i<arr.length; i++)
        {
          if(arr[i].position === this.state.position )
          {
             arr[i].img_url = newurl;
             arr[i].description = this.state.descvalue;
             arr[i].file = this.state.file;
             this.setState({images:arr})
             flag = 1;
          }
        }
        if(flag === 0)
        {
          let imgarr = this.state.images;
          let concatedimagearray = imgarr.concat(img);
          this.setState({images:concatedimagearray})
        }
    }
}


/*handleSendUploadedImages = (ev) =>
{

  ev.preventDefault();

    const data = new FormData();
    let arr= this.state.images;

    arr.forEach((item, i) =>
    {
    data.append(`file${[i]}`, item.file);
    data.append(`alt_name${[i]}`, item.alt_name);
    data.append(`img_url${[i]}`, item.img_url);
    })
    data.append('url', this.state.url);

    fetch('http://localhost:3002/upload', {
      method: 'post',
      body: data
    })
    .then((response) => 
    {
      response.json().then((body) => 
      {
        this.setState({ imageURL: `http://localhost:3002/uploads/${body.file}` });
      });
    });
}*/

handleimageDeletion = (e) =>
{
  this.state.images.splice(e.target.id,1)
  this.state.images.filter(Boolean);

  let arr = this.state.images
  for (let i=0; i<arr.length; i++)
  {
    arr[i].position = i;
  }

  this.setState({ images: arr })
}

  render() {

    let images = null;
    images = this.state.images.map((value,i) => {
      return(<div>
      <img alt={value.alt_name} src={value.img_url} id={value.position} onClick={this.handleimageDeletion} />
      </div>)
    })


    return (
      <div>
        {console.log(this.state.images)}

        <form >
          <div>
            <input onChange={(e) => this.setState({file:e.target.files[0]})} type="file" />
          </div>
          <br />

          <div>
              <select onChange={(e) => this.setState({position : e.target.value})}>
                <option value="0" >0</option>
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
              </select>
          </div>
          <div>
            <input type='text' onChange={(e) => this.setState({descvalue : e.target.value})} />
          </div>
          <br />
          <button onClick={this.handleUploadImage}> Upload </button>
        </form>

        {images}

      </div>
    );
  }
}

export default App;
