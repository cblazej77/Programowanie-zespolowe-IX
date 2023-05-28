import React from "react";
import { CommisionLabel, CommisionTitle, CommisionTitleContainer } from "./CommisionsElements";
import {
    CommisionBottom,
    CommisionBubble,
    CommisionText,
    CommisionTop,
    LevelBubble
} from "../Profile/ProfileElements";
import { TitleText } from "./CardsElement";

function CommisionItem(props) {

    return (
        <CommisionLabel>
            <CommisionTop>
                <CommisionTitleContainer>
                    <CommisionTitle>
                        {props.title}
                    </CommisionTitle>
                    <LevelBubble>
                        {props.level}
                    </LevelBubble>
                </CommisionTitleContainer>
                <TitleText>{props.rate} PLN</TitleText>
            </CommisionTop>
            <div>
                <CommisionText>{props.location}</CommisionText>
                <CommisionText>{props.deadline}</CommisionText>
            </div>
            <CommisionBottom>
                {props.tags.map((tag, indexT) => (
                    <CommisionBubble key={indexT}>{tag}</CommisionBubble>
                ))}
            </CommisionBottom>
        </CommisionLabel>
    );
}

export default CommisionItem;