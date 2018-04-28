import * as React from 'react';
import * as style from './style.css';
import { ImageModel } from 'app/models';
import { ImageItem } from 'app/components';
import { random as rand } from 'app/utils';

export namespace ImageList {
  export interface Props {
    limit: number;
    url: string;
  }
  export interface State {
    page: number;
    data: ImageModel[];
    limit: number;
    url: string;
  }
}

export class ImageList extends React.Component<ImageList.Props, ImageList.State> {

  wait: boolean = false;
  loading: boolean = false;
  limit = 25; // result on each page

  constructor(props: ImageList.Props) {
    super(props);
    const{ limit=25, url='' } = props;
    this.state = { data: [], page: 1, limit, url };
    this.loadData = this.loadData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  nextPage() {
    this.loadData(this.state.page + 1 );
  }

  loadData(page:number) {
    if (this.loading) return;
    const offset = (page-1)*this.state.limit;
    console.log(page, offset, this.state.limit);
    let url = `${this.state.url}&offset=${offset}&limit=${this.state.limit}`;
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

  componentDidMount() {
    this.loadData(1);
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
      if(document.documentElement.scrollTop + 2*window.innerHeight>=document.documentElement.offsetHeight) {
        that.nextPage();
      }
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
