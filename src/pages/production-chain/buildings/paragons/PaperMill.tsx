import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import PaperMillIcon from '../../../../assets/icons/buildings/paragons/PaperMill.png'
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
import { RiverField } from '../../tiles/RiverField'
import { LIME_KILN_INFO, LimeKiln } from '../colonists/LimeKiln'
import { LUMBERJACK_INFO, Lumberjack } from '../pioneers/Lumberjack'

const ITERATION_TIME_IN_SECONDS = 120
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Wood', 8],
  ['Quicklime', 1],
  ['RiverField', 1],
])
export const PAPER_MILL_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Wood', CONSUME_PER_ITERATION.get('Wood')! / ITERATION_TIME_IN_DECIMAL],
    ['Quicklime', CONSUME_PER_ITERATION.get('Quicklime')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PaperMill = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={PaperMillIcon} alt={PaperMill.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Lumberjack
            count={props.count * (PAPER_MILL_INFO.ConsumePerMinute.get('Wood')! / LUMBERJACK_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <LimeKiln
            count={props.count * (PAPER_MILL_INFO.ConsumePerMinute.get('Quicklime')! / LIME_KILN_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        {/* TODO: Add river field to all buildings which need to be build on top of*/}
        <Paper ref={providerRef3} elevation={2} sx={ProviderPaperStyle}>
          <RiverField count={props.count * PAPER_MILL_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
    </Box>
  )
}

export const PaperMillButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PaperMillIcon}
      buildingElement={PaperMill}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
