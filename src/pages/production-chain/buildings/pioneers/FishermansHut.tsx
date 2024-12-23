import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import FishermansHutIcon from '../../../../assets/icons/buildings/pioneers/FishermansHut.png'
import {
  BuildingGroup,
  BuildingImageSize,
  ConsumerPaperStyle,
  ProviderBoxStyle,
  SingleBuildingWithCount,
} from '../../../../assets/styling/BuildingStyle'
import { Arrow } from '../../../../common/Arrow'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'
import { Water } from '../../tiles/Water'
import { Weir } from '../../tiles/Weir'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { RiverField } from '../../tiles/RiverField'

const ITERATION_TIME_IN_SECONDS = 90
const PRODUCE_PER_ITERATION = 0.67
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['Water', 4]])
export const FISHERMANS_HUT_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Water', CONSUME_PER_ITERATION.get('Water')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const FishermansHut = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  return (
    <Box sx={{ ...BuildingGroup, flexDirection: globalInvertBuildingChainOrder.value ? 'row-reverse' : 'row' }}>
      <Paper
        ref={consumerRef}
        elevation={2}
        sx={{
          ...ConsumerPaperStyle,
          marginRight: globalInvertBuildingChainOrder.value ? 0 : '4rem',
          marginLeft: globalInvertBuildingChainOrder.value ? '4rem' : 0,
        }}
      >
        <Box sx={SingleBuildingWithCount}>
          <Box
            component="img"
            src={FishermansHutIcon}
            title={capitalCase(FishermansHut.name)}
            alt={FishermansHut.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <Water count={props.count * FISHERMANS_HUT_INFO.ConsumePerIteration.get('Water')!} />,
              <RiverField count={props.count * FISHERMANS_HUT_INFO.ConsumePerIteration.get('Water')!} />,
              <Weir count={(props.count * FISHERMANS_HUT_INFO.ConsumePerIteration.get('Water')!) / 2} />,
            ]}
          />
        </Box>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const FishermansHutButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={FishermansHutIcon}
      buildingElement={FishermansHut}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
