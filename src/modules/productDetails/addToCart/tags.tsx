// Tags.tsx
import { FC } from 'react';
import { TagsWrapper } from '../../../static/styles/styles';

interface TagsProps {
    tags: string[];
}

export const Tags: FC<TagsProps> = ({ tags }) => {
    return (
        <TagsWrapper>
            {tags.map((tag, index) => (
                <li key={index}>{tag}</li>
            ))}
        </TagsWrapper>
    );
};
