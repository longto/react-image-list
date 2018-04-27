import * as React from 'react';
import * as style from './style.css';
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

  handleDoubleClick() {
    this.setState({ fullScreen: true });
  }

  render() {
    const { image } = this.props;
    return (
      <div className={style.imageContainer}>
        <picture>
          <img src={image.images['fixed_width_small_still']['url'].replace('media0','i')} alt={image.title}/>
        </picture>
      </div>
    )
  }
}
