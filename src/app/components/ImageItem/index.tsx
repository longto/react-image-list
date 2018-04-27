import * as React from 'react';
import * as style from './style.css';
import * as classNames from 'classnames';
import { ImageModel } from 'app/models';

export namespace ImageItem {
  export interface Props {
    image: ImageModel;
  }

  export interface State {
    fullScreen: boolean;
  }
}

export class ImageItem extends React.Component<ImageItem.Props, ImageItem.State> {
  constructor(props: ImageItem.Props, context?: any) {
    super(props, context);
    this.state = { fullScreen: false };
  }

  handleClick() {
    this.setState({ fullScreen: !this.state.fullScreen });
  }

  random(min=0, max=100){
    return (min + Math.random() * (max - min)) | 0;
  }

  render() {
    const { image } = this.props;
    const { user } = image;
    const url = image.images[this.state.fullScreen ? 'original' : 'fixed_width_small_still']['url'].replace('media0', 'i');
    const classes = classNames({
      [style.imageContainer]: true,
      [style.fullScreen]: this.state.fullScreen,
    });
    const hasLink = classNames({
      [style.link]: this.random()%2 === 0,
    });

    return (
      <div className={classes} onClick={this.state.fullScreen ? this.handleClick.bind(this) : null}>
        <figure>
          <img src={url} alt={image.slug} title={image.title} onClick={this.handleClick.bind(this)}/>
          <figcaption title={image.title}>
            {image.title}
          </figcaption>
          <div className={style.meta}>
            <span className={hasLink}> </span>
            <span className={style.eye}> {this.random(1000,7000)} </span>
            <span className={style.comment}> {this.random()} </span>
            <span className={style.love}> {this.random()} </span>
          </div>
        </figure>
        <div className={style.user}>
          <img src={user ? user['avatar_url'] : '' }/>
          <span>{image.username}</span>
        </div>
      </div>
    )
  }
}
