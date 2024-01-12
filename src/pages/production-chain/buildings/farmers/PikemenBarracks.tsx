import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import PikemenBarracksIcon from '../../../../assets/icons/buildings/farmers/PikemenBarracks.png'
import {
  BuildingGroup,
  BuildingImageSize,
  ConsumerPaperStyle,
  ProviderBoxStyle,
  ProviderPaperStyle,
  SingleBuildingWithCount,
} from '../../../../assets/styling/BuildingStyle'
import { Arrow } from '../../../../common/Arrow'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'
import { FARMERS_SHACK_INFO, FarmersShack } from './FarmersShack'
import { POLETURNERS_WORKSHOP_INFO, PoleturnersWorkshop } from './PoleturnersWorkshop'

const ITERATION_TIME_IN_SECONDS = 900
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Slinger', 3],
  ['Pike', 1],
])
export const PIKEMEN_BARRACKS_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Slinger', CONSUME_PER_ITERATION.get('Slinger')! / ITERATION_TIME_IN_DECIMAL],
    ['Pike', CONSUME_PER_ITERATION.get('Pike')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PikemenBarracks = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={PikemenBarracksIcon} alt={PikemenBarracks.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <FarmersShack
            count={
              props.count *
              (PIKEMEN_BARRACKS_INFO.ConsumePerMinute.get('Slinger')! / FARMERS_SHACK_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <PoleturnersWorkshop
            count={
              props.count *
              (PIKEMEN_BARRACKS_INFO.ConsumePerMinute.get('Pike')! / POLETURNERS_WORKSHOP_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const PikemenBarracksButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PikemenBarracksIcon}
      buildingElement={PikemenBarracks}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
