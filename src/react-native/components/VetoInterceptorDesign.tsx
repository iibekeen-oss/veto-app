import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Defs,
  Line,
  Path,
  Circle,
  G,
  Text as SvgText,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode,
} from 'react-native-svg';

// Color definitions matching the design spec
const DeepNeonGreen = 'rgba(0, 255, 102, 0.67)'; // 0xAA00FF66 (Target/Attacker)
const BlazingRed = '#FF3333';                    // 0xFFFF3333 (VETO Interceptor)
const PitchBlack = '#121212';                    // 0xFF121212 (Dark Background)

interface VetoInterceptorDesignProps {
  style?: any;
}

/**
 * VetoInterceptorDesign (React Native / react-native-svg):
 * 1. drawRadarGrid: Subtle radar blueprint grid lines
 * 2. drawTargetTrajectory: Parabolic target arc from upper right to (0.5w, 0.6h) in DeepNeonGreen
 * 3. drawInterceptorWithVetoText: Blazing red rocket thruster plume, PAC-3 body,
 *    and bold white "VETO" text rotated at -45° along the fuselage axis.
 */
export default function VetoInterceptorDesign({ style }: VetoInterceptorDesignProps) {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  const width = windowWidth || 390;
  const height = windowHeight || 844;

  // Intercept point coordinates
  const interceptX = width * 0.5;
  const interceptY = height * 0.6;
  const startX = width * 0.1;
  const startY = height * 1.0;

  return (
    <View style={[styles.container, style]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <Filter id="rnGlow" x="-30%" y="-30%" width="160%" height="160%">
            <FeGaussianBlur stdDeviation="3" result="blur" />
            <FeMerge>
              <FeMergeNode in="blur" />
              <FeMergeNode in="SourceGraphic" />
            </FeMerge>
          </Filter>
        </Defs>

        {/* 1. Radar Grid (drawRadarGrid) */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <React.Fragment key={`grid-${i}`}>
            <Line
              x1={0}
              y1={i * 200}
              x2={width}
              y2={i * 200}
              stroke="gray"
              strokeWidth={1}
              strokeOpacity={0.3}
            />
            <Line
              x1={i * 300}
              y1={0}
              x2={i * 300}
              y2={height}
              stroke="gray"
              strokeWidth={1}
              strokeOpacity={0.3}
            />
          </React.Fragment>
        ))}

        {/* 2. Target Trajectory (drawTargetTrajectory - DeepNeonGreen) */}
        <Path
          d={`M ${width * 0.9} 0 C ${width * 0.8} ${height * 0.3}, ${width * 0.6} ${height * 0.5}, ${interceptX} ${interceptY}`}
          stroke={DeepNeonGreen}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />

        {/* 3. Interceptor Trajectory Line (BlazingRed) */}
        <Line
          x1={startX}
          y1={startY}
          x2={interceptX}
          y2={interceptY}
          stroke={BlazingRed}
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Volumetric Thruster Plume */}
        <Circle
          cx={startX}
          cy={startY - 20}
          r={50}
          fill={BlazingRed}
          fillOpacity={0.8}
        />
        <Circle
          cx={startX}
          cy={startY - 20}
          r={25}
          fill="#FFAA00"
          fillOpacity={0.9}
        />

        {/* PAC-3 Interceptor Body Circle */}
        <Circle
          cx={startX + (interceptX - startX) * 0.4}
          cy={startY + (interceptY - startY) * 0.4}
          r={8}
          fill={BlazingRed}
        />

        {/* "VETO" Stenciled White Text Rotated at -45° */}
        <G
          rotation="-45"
          origin={`${startX + (interceptX - startX) * 0.45}, ${startY + (interceptY - startY) * 0.45}`}
        >
          <SvgText
            x={startX + (interceptX - startX) * 0.45}
            y={startY + (interceptY - startY) * 0.45}
            fill="#FFFFFF"
            fontSize="36"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            VETO
          </SvgText>
        </G>

        {/* Zero-Point Hit-to-Kill Impact Flash at (interceptX, interceptY) */}
        <Circle cx={interceptX} cy={interceptY} r={14} fill="#FFFFFF" />
        <Circle cx={interceptX} cy={interceptY} r={28} stroke={BlazingRed} strokeWidth={2} strokeDasharray="4 4" fill="none" />
        <Circle cx={interceptX} cy={interceptY} r={42} stroke={DeepNeonGreen} strokeWidth={1.5} strokeDasharray="3 3" fill="none" />
        {/* Kinetic debris rays */}
        <Line x1={interceptX} y1={interceptY} x2={interceptX + 30} y2={interceptY - 25} stroke="#FFAA00" strokeWidth={2} strokeLinecap="round" />
        <Line x1={interceptX} y1={interceptY} x2={interceptX - 25} y2={interceptY + 30} stroke={BlazingRed} strokeWidth={2} strokeLinecap="round" />
        <Line x1={interceptX} y1={interceptY} x2={interceptX + 35} y2={interceptY + 20} stroke={DeepNeonGreen} strokeWidth={2} strokeLinecap="round" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PitchBlack,
    overflow: 'hidden',
  },
});
