import * as React from 'react';
import * as style from './style.css';
import { ImageModel } from 'app/models';
import { ImageItem } from 'app/components';
import { random as rand } from 'app/utils';

export namespace ImageList {
  export interface Props {
    page : number;
  }
  export interface State {
    page: number;
    data: ImageModel[];
  }
}

export class ImageList extends React.Component<ImageList.Props, ImageList.State> {

  wait: boolean = false;
  loading: boolean = false;
  limit = 25; // result on each page

  constructor(props: ImageList.Props) {
    super(props);
    this.state = { data: [], page: 1 };
    this.loadData = this.loadData.bind(this);
    this.jumpPage = this.jumpPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  nextPage() {
    this.jumpPage(this.state.page + 1 );
  }

  loadData(page:number, offset:number, limit:number) {
    if (this.loading) return;
    console.log(page, offset, limit);
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=27wYcK1dzHxwPmK4WCmvbo2IMcOEzYhi&offset=${offset}&limit=${limit}`;
    this.loading = true;
    fetch(url)
      .then(response => response.json())
      .then(({ data, pagination, meta }) => {
        console.log(data, pagination, meta);
        this.setState({
          ...this.state,
          page,
          data: [...this.state.data, ...data],
        });
        this.loading = false;
      })
      .catch(err => console.error(err.toString()))
  }

  jumpPage(page: number = 1){

    this.loadData(page,(page-1)*this.limit, this.limit);
  }

  componentDidMount() {
    this.jumpPage(1);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event: any) {
    if (this.wait) return;
    this.wait = true;
    const that = this;
    requestAnimationFrame(()=>{
      that.wait = false;
      if(document.documentElement.scrollTop + window.innerHeight>=document.documentElement.offsetHeight-500) {
        that.nextPage();
        console.log('At the bottom');
      }
      console.log('scroll');
    });
  }

  render() {
    if(!this.state.data.length) {
      return <div>loading ...</div>;
    } else {
      return (
        <div>
          <section className={style.imageList}>
            {this.state.data.map((eachImg:ImageModel, i:number) => {
              return (
                <ImageItem key={rand(0,99999)+eachImg.id} image={eachImg} />
              )
            })}
          </section>
        </div>
      )
    }
  }
}
