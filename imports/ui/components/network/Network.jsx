import React from 'react'
import cytoscape from 'cytoscape'

import NetworkDefaultStyle from './NetworkDefaultStyle'

import {nodeMove} from '/imports/api/nodes/nodesMethods'
import { Nodes, Edges } from '/imports/api/collections.js'


const CYTOSCAPE_DIV_ID = 'network'

const style = {
  divNetwork : {
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: '0px',
    left: '0',
    zIndex : -1
  }
}

class Network extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      layoutName : this.props.layoutName,
      style: this.props.style,
      network : null // cytoscape instance
    }
    this.createNetwork = this.createNetwork.bind(this)
    this.updateNetwork = this.updateNetwork.bind(this)

  }

  createNetwork() {
    console.log('* Cytoscape init...')
    const network = cytoscape(
      {
        container: document.getElementById(CYTOSCAPE_DIV_ID),
        elements: { nodes: this.props.nodes, edges : this.props.edges },
        style: this.props.style,
        layout: {
          name: this.state.layoutName
        }
      }
    )

    // drag node
    network.off('free', 'node')  // reset
    network.on('free', 'node', function(e) {
      var node = e.cyTarget
      // var that = this

      console.log("PEC DBG: nodeMove.call")
      console.log("PEC DBG: " + JSON.stringify({ 'data.id': node.id() ,"position":node.position() } ))

      let result=nodeMove.call({ nodeId : node.id(), position : node.position()})

      console.log("PEC DBG: result " + JSON.stringify(result) )
    })


    this.setState({ network })
  }

  updateNetwork() {
    // TODO : check for missing nodes in edges
    if (typeof(this.props.nodes[9]) !== 'undefined')
      console.log("PEC DBG: updateNetwork " + JSON.stringify(this.props.nodes[9].position))

    debugger
    this.state.network.json({
      elements : { nodes : this.props.nodes, edges : this.props.edges }
    })
  }

  // componentWillReceiveProps(nextProps){
  //   console.log("PEC DBG: componentWillReceiveProps " + JSON.stringify(nextProps))
  //   this.state.network.json(nextProps);
  // }


  componentDidMount() {
    this.createNetwork()
  }

  componentDidUpdate() {
    console.log("PEC DBG: componentDidUpdate updateNetwork")
    this.updateNetwork()
  }

  // TODO check nodes/edges diff
  shouldComponentUpdate(nextProps, nextState) {
    console.log("PEC DBG: shouldComponentUpdate")
    let a1=nextProps.nodes
    let a2=this.props.nodes

    if (typeof(a1[9]) !== 'undefined')
      console.log("NEXT: "+JSON.stringify(a1[9].position))
    if (typeof(a2[9]) !== 'undefined')
      console.log("THIS: "+JSON.stringify(a2[9].position))

    if ( a1.length==a2.length && a1.every((v,i)=> v === a2[i]) ) {
      console.log('Network unchanged, not updating cytoscapejs')
      return false
    }
    //debugger
    console.log('Network changed, updating cytoscapejs')
    // this.state.network.json({
    //   elements : { nodes : a2 }
    // })
    //this.setState({ this.state.network })
    return true
  }

  render() {
    return (
      <div
        id={CYTOSCAPE_DIV_ID}
        style={style.divNetwork}
      >
      </div>
    )
  }
}

Network.propTypes = {
  topogramId : React.PropTypes.string,
  nodes : React.PropTypes.array,
  nodesReady : React.PropTypes.bool,
  edges : React.PropTypes.array,
  edgesReady : React.PropTypes.bool,
  style : React.PropTypes.object,
  layoutName : React.PropTypes.string
}

Network.defaultProps = {
  nodes : [],
  nodesReady : false,
  edges : [],
  edgesReady : false,
  style : NetworkDefaultStyle(),
  layoutName : 'preset'
}
export default Network
