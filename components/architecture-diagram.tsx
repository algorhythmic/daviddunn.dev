"use client"

import { memo, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import type { Architecture, ArchNodeVariant } from "@/lib/portfolio-data"

type NodeData = {
  label: string
  detail?: string
}

const HANDLE_STYLE = {
  width: 6,
  height: 6,
  background: "#28ff28",
  border: "1px solid #0a3d0a",
}

function NodeChrome({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      <Handle type="target" position={Position.Top} style={HANDLE_STYLE} />
      <Handle type="source" position={Position.Bottom} style={HANDLE_STYLE} />
      <Handle type="target" position={Position.Left} id="left" style={HANDLE_STYLE} />
      <Handle type="source" position={Position.Right} id="right" style={HANDLE_STYLE} />
      <div className={className}>{children}</div>
    </>
  )
}

function NodeLabel({ label, detail }: NodeData) {
  return (
    <>
      <div className="font-mono font-bold text-[#28ff28] text-[11px] leading-tight uppercase tracking-wider">
        {label}
      </div>
      {detail && (
        <div className="font-mono text-[#28ff28]/70 text-[9px] leading-tight mt-0.5">
          {detail}
        </div>
      )}
    </>
  )
}

const AgentNode = memo(({ data }: NodeProps<Node<NodeData>>) => (
  <NodeChrome className="bg-black border-2 border-[#28ff28] px-3 py-2 min-w-[110px] text-center shadow-[0_0_8px_rgba(40,255,40,0.45)]">
    <NodeLabel {...data} />
  </NodeChrome>
))
AgentNode.displayName = "AgentNode"

const DaemonNode = memo(({ data }: NodeProps<Node<NodeData>>) => (
  <NodeChrome className="bg-black border-2 border-dashed border-[#28ff28] px-3 py-2 min-w-[110px] text-center shadow-[0_0_8px_rgba(40,255,40,0.45)]">
    <NodeLabel {...data} />
  </NodeChrome>
))
DaemonNode.displayName = "DaemonNode"

const InterfaceNode = memo(({ data }: NodeProps<Node<NodeData>>) => (
  <NodeChrome className="bg-black border-2 border-[#28ff28] rounded-full px-4 py-2 min-w-[110px] text-center shadow-[0_0_8px_rgba(40,255,40,0.45)]">
    <NodeLabel {...data} />
  </NodeChrome>
))
InterfaceNode.displayName = "InterfaceNode"

const HumanNode = memo(({ data }: NodeProps<Node<NodeData>>) => (
  <NodeChrome className="relative bg-[#28ff28] text-black px-5 py-3 min-w-[120px] text-center shadow-[0_0_12px_rgba(40,255,40,0.6)] hexagon-clip">
    <div className="font-mono font-bold text-black text-[11px] leading-tight uppercase tracking-wider">
      {data.label}
    </div>
    {data.detail && (
      <div className="font-mono text-black/70 text-[9px] leading-tight mt-0.5">
        {data.detail}
      </div>
    )}
  </NodeChrome>
))
HumanNode.displayName = "HumanNode"

const BusNode = memo(({ data }: NodeProps<Node<NodeData>>) => (
  <NodeChrome className="bg-black border-2 border-double border-[#28ff28] px-4 py-2 min-w-[120px] text-center shadow-[0_0_8px_rgba(40,255,40,0.45)] [transform:skewX(-12deg)]">
    <div className="[transform:skewX(12deg)]">
      <NodeLabel {...data} />
    </div>
  </NodeChrome>
))
BusNode.displayName = "BusNode"

const DataStoreNode = memo(({ data }: NodeProps<Node<NodeData>>) => (
  <>
    <Handle type="target" position={Position.Top} style={HANDLE_STYLE} />
    <Handle type="source" position={Position.Bottom} style={HANDLE_STYLE} />
    <Handle type="target" position={Position.Left} id="left" style={HANDLE_STYLE} />
    <Handle type="source" position={Position.Right} id="right" style={HANDLE_STYLE} />
    <div className="relative min-w-[110px] py-3">
      <div className="absolute top-0 left-0 right-0 h-3 border-2 border-[#28ff28] rounded-[50%] bg-black" />
      <div className="bg-black border-l-2 border-r-2 border-[#28ff28] px-3 py-2 mt-1.5 mb-1.5 text-center shadow-[0_0_8px_rgba(40,255,40,0.45)]">
        <NodeLabel {...data} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-3 border-2 border-[#28ff28] rounded-[50%] bg-black" />
    </div>
  </>
))
DataStoreNode.displayName = "DataStoreNode"

const nodeTypes = {
  agent: AgentNode,
  daemon: DaemonNode,
  datastore: DataStoreNode,
  human: HumanNode,
  interface: InterfaceNode,
  bus: BusNode,
} as const

function variantToType(v: ArchNodeVariant): keyof typeof nodeTypes {
  return v
}

function ArchFlowViewport({ architecture }: { architecture: Architecture }) {
  const nodes: Node<NodeData>[] = useMemo(
    () =>
      architecture.nodes.map((n) => ({
        id: n.id,
        type: variantToType(n.variant),
        position: n.position,
        data: { label: n.label, detail: n.detail },
        draggable: false,
      })),
    [architecture.nodes],
  )

  const edges: Edge[] = useMemo(
    () =>
      architecture.edges.map((e, i) => {
        const isFeedback = e.variant === "feedback"
        return {
          id: e.id ?? `${e.from}-${e.to}-${i}`,
          source: e.from,
          target: e.to,
          label: e.label,
          type: "smoothstep",
          animated: isFeedback,
          markerEnd: { type: MarkerType.ArrowClosed, color: "#28ff28" },
          style: {
            stroke: "#28ff28",
            strokeWidth: 1.5,
            strokeDasharray: isFeedback ? "4 3" : undefined,
          },
          labelStyle: {
            fill: "#28ff28",
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.05em",
          },
          labelBgStyle: {
            fill: "#000",
            stroke: "#28ff28",
            strokeWidth: 1,
          },
          labelBgPadding: [4, 2] as [number, number],
        }
      }),
    [architecture.edges],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.18 }}
      proOptions={{ hideAttribution: true }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnScroll={false}
      zoomOnScroll={false}
      zoomOnPinch
      panOnDrag
    >
      <Background color="#0a3d0a" gap={20} size={1} />
      <Controls
        showInteractive={false}
        className="!bg-black !border-[#28ff28] !border"
      />
    </ReactFlow>
  )
}

function TerminalTitleBar({
  title,
  maximized,
  onAction,
}: {
  title: string
  maximized: boolean
  onAction: () => void
}) {
  return (
    <div className="bg-zinc-900 border-b border-[#28ff28]/20 px-3 py-2 flex items-center gap-2 select-none">
      <div className="flex gap-1.5 shrink-0">
        <button
          type="button"
          onClick={maximized ? onAction : undefined}
          aria-label={maximized ? "Close" : "Close (decorative)"}
          className="w-3 h-3 rounded-full bg-red-500/85 border border-red-800 hover:bg-red-400 hover:scale-110 transition cursor-pointer"
        />
        <button
          type="button"
          aria-label="Minimize (decorative)"
          className="w-3 h-3 rounded-full bg-yellow-500/85 border border-yellow-800 hover:bg-yellow-400 hover:scale-110 transition cursor-pointer"
        />
        <button
          type="button"
          onClick={onAction}
          aria-label={maximized ? "Restore window" : "Maximize window"}
          title={maximized ? "Restore" : "Maximize to fit screen"}
          className="w-3 h-3 rounded-full bg-green-500/90 border border-green-800 hover:bg-[#28ff28] hover:scale-110 transition cursor-pointer"
        />
      </div>
      <div className="flex-1 text-center font-mono text-[11px] text-[#28ff28]/70 tracking-wider truncate px-2">
        {title}
      </div>
      <div className="w-[42px] shrink-0" />
    </div>
  )
}

export function ArchitectureDiagram({
  architecture,
  slug,
}: {
  architecture: Architecture
  slug: string
}) {
  const [maximized, setMaximized] = useState(false)
  const title = `${slug} ─ architecture`

  useEffect(() => {
    if (!maximized) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMaximized(false)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [maximized])

  return (
    <>
      {/* Inline terminal window */}
      <div className="rounded-lg border border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)] overflow-hidden bg-black">
        <TerminalTitleBar
          title={title}
          maximized={false}
          onAction={() => setMaximized(true)}
        />
        <div className="relative w-full h-[400px] saga-arch-flow">
          <ArchFlowViewport architecture={architecture} />
        </div>
      </div>

      {/* Maximized modal — portaled to document.body to escape ancestor transforms */}
      {maximized &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 md:p-6 animate-in fade-in duration-150">
            <button
              type="button"
              aria-label="Close architecture diagram"
              onClick={() => setMaximized(false)}
              className="absolute inset-0 cursor-default"
            />
            <div className="relative flex flex-col w-full max-w-[1400px] h-[90vh] rounded-lg border border-zinc-600 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden bg-black">
              <TerminalTitleBar
                title={title}
                maximized
                onAction={() => setMaximized(false)}
              />
              <div className="relative flex-1 w-full saga-arch-flow">
                <ArchFlowViewport architecture={architecture} />
              </div>
            </div>
          </div>,
          document.body,
        )}

      <style jsx global>{`
        .saga-arch-flow .react-flow {
          background: #000;
        }
        .saga-arch-flow .react-flow__controls-button {
          background: #000 !important;
          border-bottom: 1px solid #28ff28 !important;
          color: #28ff28 !important;
          fill: #28ff28 !important;
        }
        .saga-arch-flow .react-flow__controls-button:hover {
          background: #003d00 !important;
        }
        .saga-arch-flow .react-flow__controls-button svg {
          fill: #28ff28;
        }
        .saga-arch-flow .react-flow__edge-text {
          fill: #28ff28;
        }
        .saga-arch-flow .react-flow__attribution {
          display: none;
        }
        .hexagon-clip {
          clip-path: polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%);
        }
      `}</style>
    </>
  )
}
