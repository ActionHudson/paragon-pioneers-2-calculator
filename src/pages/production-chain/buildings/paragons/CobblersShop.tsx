import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import CobblersShopIcon from '../../../../assets/icons/buildings/paragons/CobblersShop.png'
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
import { CROCODILE_RANCH_INFO, CrocodileRanch } from '../farmers/CrocodileRanch'
import { BRASS_SMELTER_INFO, BrassSmelter } from '../northern-islands/BrassSmelter'
import { TANNERY_INFO, Tannery } from '../townsmen/Tannery'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 4
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Brass', 1],
  ['Leather', 2],
])
export const COBBLERS_SHOP_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Brass', CONSUME_PER_ITERATION.get('Brass')! / ITERATION_TIME_IN_DECIMAL],
    ['Leather', CONSUME_PER_ITERATION.get('Leather')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CobblersShop = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={CobblersShopIcon} alt={CobblersShop.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <BrassSmelter
            count={
              props.count * (COBBLERS_SHOP_INFO.ConsumePerMinute.get('Brass')! / BRASS_SMELTER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <Tannery
            count={props.count * (COBBLERS_SHOP_INFO.ConsumePerMinute.get('Leather')! / TANNERY_INFO.ProducePerMinute)}
          />
          OR
          <CrocodileRanch
            count={
              props.count *
              (COBBLERS_SHOP_INFO.ConsumePerMinute.get('Leather')! / CROCODILE_RANCH_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const CobblersShopButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CobblersShopIcon}
      buildingElement={CobblersShop}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
