import React, { PropTypes } from 'react'
import { FeatureGroup, Polyline } from 'react-leaflet'
import ui from 'redux-ui'

@ui()
export default class GeoEdges extends React.Component {
  static propTypes = {
    edges : PropTypes.array.isRequired,
    selectionModeOn : PropTypes.bool,
    onClickGeoElement : PropTypes.func.isRequired,
    selectGeoElement : PropTypes.func.isRequired,
    unselectGeoElement : PropTypes.func.isRequired,
    unselectAllElements : PropTypes.func.isRequired
  }

  render() {
    const { selectionModeOn } = this.props
    const edges = this.props.edges.map( (e,i) => {
      const filter = `edge[source="${e.data.source}"][target="${e.data.target}"]`
      return (
        <Polyline
          key={`edge-${i}`}
          color={e.selected ? 'yellow' : 'purple'}
          positions={e.coords}
          onClick={() => selectionModeOn ?
            this.props.onClickGeoElement(filter)
            :
            null
          }
          onMouseDown={() => !selectionModeOn ?
            this.props.selectGeoElement(filter)
            :
            null
          }
          onMouseUp={()=> !selectionModeOn ?
            this.props.unselectAllElements()
            :
            null
          }
        />
      )
    }
    )

    return (
      <FeatureGroup name="GeoEdges"
        ref="edgesGroup">
        {edges}
      </FeatureGroup>
    )
  }
}
