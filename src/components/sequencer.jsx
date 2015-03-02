/** @jsx React.DOM */

var React = require('react');

var stepFilter = require('../util/step-filter');
var TriggerRow = require('./trigger-row.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      isSelecting: false,
      isDeselecting: false,
    }
  },

  setMouseDown: function(mode) {
    if (mode == 'select') {
      this.setState({ isSelecting: true });
    } else if (mode == 'deselect') {
      this.setState({ isDeselecting: true });
    }
  },

  setMouseUp: function() {
    this.setState({
      isSelecting: false,
      isDeselecting: false
    });
  },

  renderRow: function(clip, i) {
    var self = this;
    var updateClip = function(clip) {
      var clips = self.props.clips;
      clips[i] = clip;
      self.props.updateClips(clips);
    };
    return (
      <TriggerRow
        {...this.props}
        {...this.state}
        clip={clip}
        setMouseDown={this.setMouseDown}
        setMouseUp={this.setMouseUp}
        currentStep={this.props.currentStep}
        updateClip={updateClip}
        track={i} />
    )
  },

  renderXAxis: function() {
    var self = this;
    var currentStep = this.props.currentStep
    var renderSteps = function() {
      var steps = [];
      for (var i = 0; i < self.props.loopLength; i++) {
        var current = (i == currentStep);
        var stepClass = 'h5 bold flex-auto px1 py1 ';
        stepClass += current ? 'red ' : '';
        if (!current) {
          stepClass += i%4 ? 'muted ' : '';
        }
        //stepClass += i%4 ? '' : 'bg-darken-2';
        var stepStyle = {
          width: (1/self.props.loopLength) + '%'
        };
        var axisStepKey = 'axis-step-' + i;
        steps.push(
          <div key={axisStepKey}
            className={stepClass}
            style={stepStyle}>
            {stepFilter(i)}
          </div>
        )
      }
      return steps;
    }
    return (
      <div className="flex flex-center mxn1">
        {renderSteps()}
      </div>
    )
  },

  render: function() {
    var innerStyle = {
      width: (100 * (this.props.loopLength / 16)) + '%',
      marginLeft: (-100 * this.props.currentPage) + '%',
      transition: 'margin .125s ease-in-out'
    };
    return (
      <div className="flex-auto px2">
        <div className="overflow-hidden">
          <div style={innerStyle}>
            {this.renderXAxis()}
            {this.props.clips.map(this.renderRow)}
          </div>
        </div>
      </div>
    )
  }

});

