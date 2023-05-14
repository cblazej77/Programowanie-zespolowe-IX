import React from "react";
import { CommisionLabel } from "./CommisionsElements";
import {
    CommisionBottom,
    CommisionBubble,
    CommisionText,
    CommisionTitle,
    CommisionTitleContainer,
    CommisionTop,
    LevelBubble
} from "../../components/ProfileElements";
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
                <TitleText>{props.stake} PLN</TitleText>
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