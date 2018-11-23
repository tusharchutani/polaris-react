import * as React from 'react';
// import {noop} from '../../utilities/other';

export interface SourceSet {
  source: string;
  descriptor?: string;
}

export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export interface Props extends React.HTMLProps<HTMLImageElement> {
  alt: string;
  source: string;
  sourceSet?: SourceSet[];
  onLoad?(): void;
  onError?(): void;
}

export interface State {
  imageLoaded: boolean;
}

export default class Image extends React.PureComponent<Props, never> {
  // state: State = {
  //   imageLoaded: false,
  // };

  private imgRef = React.createRef<HTMLImageElement>();

  // componentDidMount() {
  //   const img = this.imgRef.current;
  //   if (!img) {
  //     return;
  //   }
  //   const {onLoad = noop, onError = noop, source} = this.props;
  //   img.setAttribute('src', source);
  //   img.addEventListener('load', onLoad);
  //   img.addEventListener('error', onError);
  // }

  // componentWillUnmount() {
  //   const img = this.imgRef.current;
  //   if (!img) {
  //     return;
  //   }
  //   const {onLoad = noop, onError = noop} = this.props;
  //   img.removeEventListener('load', onLoad);
  //   img.removeEventListener('error', onError);
  // }

  render() {
    const {
      sourceSet,
      source,
      crossOrigin,
      // onLoad = noop,
      // onError = noop,
      ...rest
    } = this.props;
    const finalSourceSet = sourceSet
      ? sourceSet
          .map(
            ({source: subSource, descriptor}) => `${subSource} ${descriptor}`,
          )
          .join(',')
      : null;

    return finalSourceSet ? (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        ref={this.imgRef}
        srcSet={finalSourceSet}
        src={source}
        crossOrigin={crossOrigin as CrossOrigin}
        {...rest}
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        ref={this.imgRef}
        crossOrigin={crossOrigin as CrossOrigin}
        src={source}
        {...rest}
      />
    );
  }
}
