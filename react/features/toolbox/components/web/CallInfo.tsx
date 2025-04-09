import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import { IReduxState } from "../../../app/types";
import { getParticipantDisplayName } from "../../../base/participants/functions";
import { getLargeVideoParticipant } from "../../../large-video/functions";
import { isVideoMutedByUser } from "../../../base/media/functions";
import { getMutedStateByParticipantAndMediaType } from "../../../base/participants/functions";
import { MEDIA_TYPE } from "../../../base/media/constants";
import ConferenceTimer from "../../../conference/components/ConferenceTimer";
import { isRemoteTrackMuted } from "../../../base/tracks/functions.any";
import Icon from "../../../base/icons/components/Icon";
import { IconMicFill } from "../../../base/icons/svg";

const StyledCallInfo = styled.div<{ isRemoteVideoMuted: boolean }>`
    padding: 20px 0;
    background-color: ${(props) => (props.isRemoteVideoMuted ? "transparent" : "#262842")};
    position: absolute;
    ${(props) => (props.isRemoteVideoMuted ? "bottom: 160px" : "top: 0")};
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
        color: #f7f8fc;
        font-size: 24px;
        margin: 0;
        max-width: 300px;
    }

    .timer-wrapper {
        display: flex;
        align-items: center;
        color: #f7f8fc;
    }

    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const StyledAudioStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: #a9a9b8;
    padding: 4px 8px;
    border-radius: 6px;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%, -50%);

    p,
    svg {
        fill: #262842 !important;
        color: #262842 !important;
    }

    .audio-status {
        font-size: 12px;
        font-weight: 600;
    }
`;

const CallInfo = () => {
    const largeVideoParticipant = useSelector(getLargeVideoParticipant);
    const selectedId = largeVideoParticipant?.id;
    const nameToDisplay = useSelector((state: IReduxState) => getParticipantDisplayName(state, selectedId ?? ""));
    const isVideoMuted = useSelector(isVideoMutedByUser);
    const state = useSelector((state: IReduxState) => state);
    const tracks = state["features/base/tracks"];

    // Проверяем состояние видео собеседника
    const isRemoteVideoMuted = useSelector((state: IReduxState) =>
        largeVideoParticipant
            ? getMutedStateByParticipantAndMediaType(state, largeVideoParticipant, MEDIA_TYPE.VIDEO)
            : true
    );

    // Проверяем состояние аудио собеседника
    const isRemoteAudioMuted = useSelector((state: IReduxState) =>
        isRemoteTrackMuted(tracks, MEDIA_TYPE.AUDIO, selectedId ?? "")
    );

    return (
        <>
            <StyledCallInfo isRemoteVideoMuted={isRemoteVideoMuted}>
                <p className="calle-name truncate">{nameToDisplay}</p>
                <div className="timer-wrapper">
                    <ConferenceTimer />
                </div>
            </StyledCallInfo>
            {isRemoteAudioMuted && (
                <StyledAudioStatus>
                    <Icon src={IconMicFill} size="16" />
                    <p className="audio-status">{`${nameToDisplay} microphone is off`}</p>
                </StyledAudioStatus>
            )}
        </>
    );
};

export default CallInfo;
