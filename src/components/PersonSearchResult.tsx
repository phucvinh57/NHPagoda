import { IPersonSearchResultProps } from "@interfaces";
import { Typography } from "@material-tailwind/react";

export function PersonSearchResult(props: IPersonSearchResultProps) {
  return (
    <div className='bg-white hover:border-2 hover:cursor-pointer border-blue-400 rounded-lg py-2 px-4 mb-2'>
      <div className='flex justify-between align-middle'>
        <Typography variant='h6'>{props.name}</Typography>
        <Typography>
          <span className='italic'>Pháp danh</span>: {props.religiousName ? props.religiousName : "Không"}
        </Typography>
      </div>
      <div className='mt-1'>
        <Typography>
          <span className='italic'>Địa chỉ</span>: {props.address}
        </Typography>
      </div>
    </div>
  );
}
