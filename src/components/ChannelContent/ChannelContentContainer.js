import React from 'react';
import {connect} from 'react-redux';
import {ChannelContent} from './ChannelContent';
import {activeChannelSelector,currentUserSelector} from '../../selectors';


const mapStateToProps = (state) => {
    const channels = state.get(`channels`);
    //const activeChannel = activeChannelSelector(state);
    const channel = activeChannelSelector(state);

    return {
        messages: channel.get(`messages`),
        channelName: channel.get(`name`),
        fetchStatus: channel.get(`fetchStatus`),
        status:currentUserSelector(state).get(`status`)
    }
};

const mapDispatchToProps = (dispatch) => ({});

export const ChannelContentContainer = connect(mapStateToProps,mapDispatchToProps)(ChannelContent);