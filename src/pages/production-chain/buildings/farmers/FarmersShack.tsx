import Box from '@mui/material/Box'
import FarmersShackIcon from '../../../../assets/icons/buildings/farmers/FarmersShack.png'
import { BuildingGroup, BuildingImageSize, SingleBuildingWithCount } from '../../../../assets/styling/BuildingStyle'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'

const ITERATION_TIME_IN_SECONDS = 60
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([])
const PRODUCE_PER_ITERATION = 0.057 // TODO: Check if numbers are right
export const FARMERS_SHACK_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const FarmersShack = (props: { count: number }) => {
  return (
    <Box sx={BuildingGroup}>
      <Box sx={SingleBuildingWithCount}>
        <img src={FarmersShackIcon} alt={FarmersShack.name} style={BuildingImageSize} />
        <Box>{Number(props.count.toFixed(2))}</Box>
        <Box>{'@ 100%'}</Box>
      </Box>
    </Box>
  )
}

export const FarmersShackButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={FarmersShackIcon}
      buildingElement={FarmersShack}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
