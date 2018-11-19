import * as React from 'react';
import {noop} from '../../utilities/other';

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

export default class Image extends React.PureComponent<Props, never> {
  private imgRef = React.createRef<HTMLImageElement>();

  componentDidMount() {
    // const {onLoad = noop, onError = noop} = this.props;
    // this.imgRef.current && this.imgRef.current.complete ? onLoad() : onError();
    this.imgRef.current && this.imgRef.current.complete;
  }

  render() {
    const {
      sourceSet,
      source,
      crossOrigin,
      onLoad = noop,
      onError = noop,
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
        src={source}
        srcSet={finalSourceSet}
        crossOrigin={crossOrigin as CrossOrigin}
        ref={this.imgRef}
        onLoad={onLoad}
        onError={onError}
        {...rest}
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        ref={this.imgRef}
        src={source}
        crossOrigin={crossOrigin as CrossOrigin}
        onLoad={onLoad}
        onError={onError}
        {...rest}
      />
    );
  }
}
