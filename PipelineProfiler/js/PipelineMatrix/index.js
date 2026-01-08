import React, {Component} from "react";
import PropTypes from 'prop-types';
import {plotPipelineMatrix, computePipelineMatrixWidthHeight} from "./plotPipelineMatrix";
import "./pipelineMatrix.css";
import {constants} from "../helpers";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import IconButton from '@material-ui/core/IconButton';
export class PipelineMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  display(props){
    const {
      data,
      pipelines,
      onClick,
      onHover,
      onSelectExpandedPrimitive,
      expandedPrimitiveData,
      expandedPrimitiveName,
      moduleNames,
      importances,
      selectedPipelines,
      metricRequest,
      metricRequest1,
      metricRequest2,
      selectedPipelinesColorScale,
      highlightPowersetColumns,
      sortColumnBy
    } = props;

    plotPipelineMatrix(
      this.ref,
      data,
      pipelines,
      moduleNames,
      importances,
      selectedPipelines,
      selectedPipelinesColorScale,
      onClick,
      onHover,
      onSelectExpandedPrimitive,
      expandedPrimitiveData,
      expandedPrimitiveName,
      metricRequest,
      metricRequest1,
      metricRequest2,
      highlightPowersetColumns,
      sortColumnBy
    );
  }

  shouldComponentUpdate(newprops, newstate){
    if (newprops.moduleNames.length !== this.props.moduleNames.length ||
      this.props.pipelines !== newprops.pipelines ||
      this.props.expandedPrimitiveData !== newprops.expandedPrimitiveData) {
      return true;
    } else {
      if (newprops.selectedPipelines !== this.props.selectedPipelines || newprops.metricRequest !== this.props.metricRequest ||
      newprops.sortRowBy !== this.props.sortRowBy || newprops.sortColumnBy !== this.props.sortColumnBy ||
        newprops.highlightPowersetColumns !== this.props.highlightPowersetColumns){
        this.display(newprops);
      }
      return false;
    }
  }

  componentDidMount(){
    this.display(this.props);
  }

  componentDidUpdate(prevProps, prevState){
    this.display(this.props);
  }

  render(){
    const {pipelines, moduleNames, expandedPrimitiveData} = this.props;

    const {svgWidth, svgHeight} = computePipelineMatrixWidthHeight(pipelines, moduleNames, expandedPrimitiveData);

    const paddingHyperparamColsWidth = expandedPrimitiveData ? expandedPrimitiveData.orderedHeader.length * constants.cellWidth + constants.widthSeparatorPrimitiveHyperparam: 0;


    return <div style={{position: 'relative', height: svgHeight, width: svgWidth}}>
        <svg style={{position: 'absolute', left: 0, top: 0}} ref={ref => this.ref = ref}/>
        <select style={{
          position: 'absolute',
          width: constants.pipelineScoreWidth,
          left: constants.margin.left + constants.pipelineNameWidth + constants.cellWidth * moduleNames.length + paddingHyperparamColsWidth,
          top: constants.margin.top + constants.moduleNameHeight + constants.moduleImportanceHeight - 25
        }} className={"selectMetric"} onChange={
          event => {
            this.props.metricRequestChange(JSON.parse(event.target.value));
          }
        }>
          {
            this.props.metricOptions.map(metricRequest => {
              return <option key={metricRequest['name']} value={JSON.stringify(metricRequest)}>{metricRequest['name']}</option>
            })
          }
        </select>

        <select style={{
          position: 'absolute',
          width: constants.pipelineScoreWidth,
          left: constants.margin.left + constants.pipelineNameWidth + constants.cellWidth * moduleNames.length + paddingHyperparamColsWidth + constants.pipelineScoreWidth ,
          top: constants.margin.top + constants.moduleNameHeight + constants.moduleImportanceHeight - 25
        }} className={"selectMetric"} onChange={
          event => {
            this.props.metricRequestChange1(JSON.parse(event.target.value));
          }
        }>
          {
            this.props.metricOptions1.map(metricRequest1 => {
              return <option key={metricRequest1['name']} value={JSON.stringify(metricRequest1)}>{metricRequest1['name']}</option>
            })
          }
        </select>
        <select style={{
          position: 'absolute',
          width: constants.pipelineScoreWidth,
          left: constants.margin.left + constants.pipelineNameWidth + constants.cellWidth * moduleNames.length + paddingHyperparamColsWidth + (2 * constants.pipelineScoreWidth),
          top: constants.margin.top + constants.moduleNameHeight + constants.moduleImportanceHeight - 25
        }} className={"selectMetric"} onChange={
          event => {
            this.props.metricRequestChange2(JSON.parse(event.target.value));
          }
        }>
          {
            this.props.metricOptions2.map(metricRequest2 => {
              return <option key={metricRequest2['name']} value={JSON.stringify(metricRequest2)}>{metricRequest2['name']}</option>
            })
          }
        </select>
        <div
          style={{
            position: 'absolute',
            left: constants.margin.left + constants.pipelineNameWidth + constants.cellWidth * moduleNames.length + paddingHyperparamColsWidth + (3 * constants.pipelineScoreWidth),
            top: constants.margin.top + constants.moduleNameHeight + constants.moduleImportanceHeight - 25,
            width: 25,
            height: 25,
          }}
          onClick={() => {
            this.props.onReversePipelinesClick();
          }}
        >
          <ImportExportIcon fontSize={"large"} style={{ color: "#6d6d6d" }}/>
        </div>
      </div>;
  }
}

PipelineMatrix.defaultProps = {
  onClick: ()=>{},
  onHover: ()=>{},
  selectedPipelinesColorScale: () => {},
  onSelectExpandedPrimitive: ()=>{}
};

PipelineMatrix.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onSelectExpandedPrimitive: PropTypes.func,
  expandedPrimitiveData: PropTypes.object,
  expandedPrimitiveName: PropTypes.string,
  selectedPipelines: PropTypes.array.isRequired,
  selectedPipelinesColorScale: PropTypes.func,
  pipelines: PropTypes.array.isRequired,
  importances: PropTypes.object.isRequired,
  metricRequestChange: PropTypes.func.isRequired,
  metricRequestChange1: PropTypes.func.isRequired,
  metricRequestChange2: PropTypes.func.isRequired,
  sortColumnBy: PropTypes.string,
  metricRequest: PropTypes.object.isRequired,
  metricOptions: PropTypes.array.isRequired,
  metricRequest1: PropTypes.object.isRequired,
  metricOptions1: PropTypes.array.isRequired,
  metricRequest2: PropTypes.object.isRequired,
  metricOptions2: PropTypes.array.isRequired,
  sortRowBy: PropTypes.string,
  moduleNames: PropTypes.array.isRequired,
  highlightPowersetColumns: PropTypes.array,
  onReversePipelinesClick: PropTypes.func
};