import { Stack, Skeleton } from '@chakra-ui/react';

const SkeletonComponent = () => {
    const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Stack className='mt-2 mx-4'>
        {skeletonData.map(skeleton => (
            <Skeleton height='30px' key={skeleton}/>
        ))}
    </Stack>
  )
}

export default SkeletonComponent