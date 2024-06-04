// Tags.tsx
import { FC } from 'react';
import { Tag, TagsWrapper } from '../../../static/styles/styles';

interface TagsProps {
    tags: string[];
}

export const Tags: FC<TagsProps> = ({ tags }) => {
    return (
        <TagsWrapper>
            {tags.map((tag, index) => (
               <Tag key={index}>{tag}</Tag>
            ))}
        </TagsWrapper>
    );
};
