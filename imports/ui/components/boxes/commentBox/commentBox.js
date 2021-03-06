import './commentBox.html'
import { Template } from 'meteor/templating'
import { Comments } from '../../../../api/collections.js'
import { FlowRouter } from 'meteor/kadira:flow-router'

import '../../comments/comment/comment.js'
import '../../comments/commentForm/commentForm.js'

import { $ } from 'meteor/jquery'

Template.commentBox.onCreated( function() {
  let topogramId = FlowRouter.getParam('topogramId')
  // subscribe to the topogram only
  this.subscribe( 'comments', topogramId )
})

Template.commentBox.rendered = function(){

}

Template.commentBox.helpers({
  comments: function() {
      let element = Template.instance().data.element
      if (element.data) {
        let type = element.group.slice(0,-1)
        return Comments.find( {
            'elementId': element._id,
            'type': type
        } ).fetch()
      }
  }
})

Template.commentBox.events = {
  'click #closeCommentBox' : function(){
    $("#commentBox").hide()
  }
}
