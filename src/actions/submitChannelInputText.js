import {currentUserSelector} from '../selectors';
import {chance} from '../utility';

export const SUBMIT_CHANNEL_INPUT_TEXT = `SUBMIT_CHANNEL_INPUT_TEXT`;

export const submitChannelInputText = (channel, text)=>(dispatch,getState)=>{
    const currentID = currentUserSelector(getState()).get(`id`);

    dispatch({
        type: SUBMIT_CHANNEL_INPUT_TEXT,
        channel,
        text,
        owner:currentID,
        id:chance.guid()
    });
};