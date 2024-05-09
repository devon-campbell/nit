import React from 'react';
import Measure from 'react-measure';

class DimensionsProvider extends React.Component {
  render() {
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.props.onResize(contentRect.bounds);
        }}
      >
        {({ measureRef, contentRect }) => (
          <div ref={measureRef}>
            {this.props.children({
              containerWidth: contentRect.bounds.width,
              containerHeight: contentRect.bounds.height,
            })}
          </div>
        )}
      </Measure>
    );
  }
}

export default DimensionsProvider;
