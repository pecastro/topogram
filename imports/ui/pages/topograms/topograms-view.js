import './topograms-view.html'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Meteor } from 'meteor/meteor'
import { TAPi18n } from 'meteor/tap:i18n';

import { Topograms } from '../../../api/collections.js'

import '../../components/boxes/infoBox/infoBox.readOnly.js'

Template.topogramView.created = function() {

  // reactive var to share across templates
  this.network = new ReactiveVar()
  this.changeLayout = new ReactiveVar()
  this.graphState = new ReactiveVar()  // init graph state (TODO : should be reactiveDict or loaded from somewhere)

  var graphState = { // should be loaded from db
      showNodesLabels : 1,
      showEdgesLabels : 0,
      layout : "circle"
    }
  Template.instance().graphState.set(graphState)
}

Template.topogramView.onCreated( function() {

  console.log(FlowRouter.getParam('topogramId'))
  Meteor.subscribe( 'topogram', FlowRouter.getParam('topogramId') )

})

Template.topogramView.helpers({
  placeholder : function() {
    return TAPi18n.__('topogram_view.searchbox')
  },
  networkInstance : function(){
    return Template.instance().network
  },
  topogram : function() {
    var t = Topograms.findOne({"_id": FlowRouter.getParam('topogramId')})
    return t
  }
})
