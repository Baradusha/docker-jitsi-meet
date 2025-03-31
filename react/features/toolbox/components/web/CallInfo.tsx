import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../../app/types';
import { getParticipantDisplayName } from '../../../base/participants/functions';
import { getLargeVideoParticipant } from '../../../large-video/functions';
import { isVideoMutedByUser } from '../../../base/media/functions';
import { getMutedStateByParticipantAndMediaType } from '../../../base/participants/functions';
import { MEDIA_TYPE } from '../../../base/media/constants';
import ConferenceTimer from '../../../conference/components/ConferenceTimer';

const StyledCallInfo = styled.div<{isRemoteVideoMuted: boolean}>`
    padding: 20px 0;
    background-color: ${props => props.isRemoteVideoMuted ? 'transparent' : '#262842'};
    position: absolute;
    ${props => props.isRemoteVideoMuted ? 'bottom: 160px' : 'top: 0'};
    left: 0;
    z-index: 252;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .calle-name {
        font-weight: 500;
        color: #F7F8FC;
        font-size: 24px;
        margin: 0;
        max-width: 300px;
    }

    .timer-wrapper {
        display: flex;
        align-items: center;
        color: #F7F8FC;
    }

    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const CallInfo = () => {
    const largeVideoParticipant = useSelector(getLargeVideoParticipant);
    const selectedId = largeVideoParticipant?.id;
    const nameToDisplay = useSelector((state: IReduxState) => getParticipantDisplayName(state, selectedId ?? ''));
    const isVideoMuted = useSelector(isVideoMutedByUser);
    
    // Проверяем состояние видео собеседника
    const isRemoteVideoMuted = useSelector((state: IReduxState) => 
        largeVideoParticipant ? getMutedStateByParticipantAndMediaType(state, largeVideoParticipant, MEDIA_TYPE.VIDEO) : true);

    return (
        <StyledCallInfo isRemoteVideoMuted={isRemoteVideoMuted}>
            <p className='calle-name truncate'>{nameToDisplay}</p>
            <div className="timer-wrapper">
                <ConferenceTimer />
            </div>
        </StyledCallInfo>
    );
};

export default CallInfo;
