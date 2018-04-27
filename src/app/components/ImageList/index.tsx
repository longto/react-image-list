import * as React from 'react';
import * as style from './style.css';
import { ImageModel } from 'app/models';
import { ImageItem } from 'app/components';

export namespace ImageList {
  export interface Props {
    page : number;
  }
  export interface State {
    page: number;
    data: ImageModel[];
    pagination: any;
  }
}

export class ImageList extends React.Component<ImageList.Props, ImageList.State> {

  constructor(props: ImageList.Props) {
    super(props);
    this.state = { data: [], page: 1, pagination: {} };
    this.loadData.bind(this);
    this.jumpPage.bind(this);
    this.handleBlur.bind(this);
    this.handleSubmit.bind(this);
    this.handleChange.bind(this);
    this.nextPage.bind(this);
    this.prevPage.bind(this);
    this.firstPage.bind(this);
    this.lastPage.bind(this);
  }

  nextPage = () => this.jumpPage(this.state.page + 1 );
  prevPage = () => this.jumpPage(this.state.page - 1 );
  firstPage = () => this.jumpPage(1);
  lastPage = () => {
    const pagination = this.state.pagination;
    if (!pagination) return;
    const lp = pagination['total_count'] / pagination['offset'];
    this.jumpPage(lp);
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    let value = event.currentTarget.value || '';
    if (event.which === 13 ) {
      this.jumpPage(+value.trim());
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value || '';
    this.jumpPage(+value.trim());
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    let value = event.target.value || '';
    this.jumpPage(+value.trim());
  }

  loadData(offset:number = 0, limit:number = 10) {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=27wYcK1dzHxwPmK4WCmvbo2IMcOEzYhi&offset=${offset}&limit=${limit}`;
    fetch(url)
      .then(response => response.json())
      .then(({ data, pagination, meta }) => {
        console.log(data, pagination, meta);
        this.setState({
          ...this.state,
          data,
          pagination,
        })
      })
      // .catch(err => console.error(this.props.url, err.toString()))
  }

  jumpPage(page: number = 1){
    const limit = 10; // result on each page
    this.setState({data: [], page});
    this.loadData((page-1)*limit, limit);
  }

  componentDidMount() {
    this.jumpPage(1);
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
                <ImageItem key={eachImg.id} image={eachImg} />
              )
            })}

          </section>
          <div className={style.pager}>
            <span className={style.status}> Display from {this.state.pagination['offset']+1} to {this.state.pagination['offset']+this.state.data.length} of {this.state.pagination['total_count']} results </span>
            <span className={style.first} onClick={this.firstPage}> </span>
            <span className={style.prev} onClick={this.prevPage}> </span>
            <input type="number" value={this.state.page}
                   onBlur={this.handleBlur}
                   onChange={this.handleChange}
                   onKeyDown={this.handleSubmit}/>
            <span className={style.next} onClick={this.nextPage}> </span>
            <span className={style.last} onClick={this.lastPage}> </span>
          </div>
        </div>
      )
    }
  }
}
