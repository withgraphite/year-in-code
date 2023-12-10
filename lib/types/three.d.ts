import {Object3DNode, extend} from '@react-three/fiber'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

declare module '@react-three/fiber' {
	interface ThreeElements {
		textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
	}
}

extend({TextGeometry})
