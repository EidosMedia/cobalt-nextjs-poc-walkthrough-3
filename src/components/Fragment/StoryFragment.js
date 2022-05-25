import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import NextLink from 'next/link'

export default function StoryFragment({ cobaltData }) {
    const render = (
        <Card sx={{mt:2}}>
            <NextLink href={cobaltData.object.data.url} passHref>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h4">
                            {cobaltData.object.data.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </NextLink>
        </Card>
    )

    return render;
}