import * as React from 'react';
import * as style from './style.css';
import { ImageModel } from 'app/models';
import { ImageItem } from 'app/components';

export namespace ImageList {
  export interface Props {
    page : number;
  }
  export interface State {
    data: ImageModel[];
  }
}

export class ImageList extends React.Component<ImageList.Props, ImageList.State> {

  constructor(props: ImageList.Props) {
    super(props);
    this.state = { data: [] };
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    let url = 'https://api.giphy.com/v1/gifs/trending?api_key=27wYcK1dzHxwPmK4WCmvbo2IMcOEzYhi&limit=5&offset=5';
    fetch(url)
      .then(response => response.json())
      .then(({ data, pagination, meta }) => {
        console.log(data, pagination, meta);
        this.setState({
          data
        })
      })
      // .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    if(!this.state.data.length) {
      return <div>loading ...</div>;
    } else {
      return (
        <section className={style.imageList}>
          {this.state.data.map((eachImg:ImageModel, i:number) => {
            return (
              <ImageItem key={eachImg.id} image={eachImg} />
            )
          })}
        </section>
      )
    }
    // your code goes here
  }
}
