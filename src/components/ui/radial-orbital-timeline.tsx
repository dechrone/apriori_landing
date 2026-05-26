"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerLabel?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  centerLabel,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval> | undefined;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const ORBIT_RADIUS = 320;

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = ORBIT_RADIUS;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-black bg-[#F5D76E] border-[#F5D76E]";
      case "in-progress":
        return "text-black bg-white border-white";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-[44rem] md:h-[52rem] flex flex-col items-center justify-center relative overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            <div
              className="relative px-5 py-2.5 md:px-6 md:py-3 rounded-xl border bg-black/60 backdrop-blur-sm"
              style={{
                borderColor: "rgba(245, 215, 110, 0.25)",
              }}
            >
              <span
                className="block whitespace-nowrap font-medium tracking-[0.16em] uppercase text-[11px] md:text-xs"
                style={{ color: "rgba(245, 230, 168, 0.7)", letterSpacing: "0.16em" }}
              >
                {centerLabel ?? "what you get back"}
              </span>
            </div>
          </div>

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F5D76E]/15"
            style={{
              width: `${ORBIT_RADIUS * 2}px`,
              height: `${ORBIT_RADIUS * 2}px`,
            }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 pointer-events-none ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(245, 215, 110, 0.55) 0%, rgba(245, 215, 110, 0) 70%)",
                    width: `${item.energy * 0.7 + 60}px`,
                    height: `${item.energy * 0.7 + 60}px`,
                    left: `-${(item.energy * 0.7 + 60 - 56) / 2}px`,
                    top: `-${(item.energy * 0.7 + 60 - 56) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    ${
                      isExpanded
                        ? "bg-[#F5D76E] text-black"
                        : isRelated
                        ? "bg-[#F5D76E]/70 text-black"
                        : "bg-black text-[#F5D76E]"
                    }
                    border-2
                    ${
                      isExpanded
                        ? "border-[#F5D76E] shadow-[0_0_30px_rgba(245,215,110,0.6)]"
                        : isRelated
                        ? "border-[#F5D76E] animate-pulse"
                        : "border-[#F5D76E]/80 shadow-[0_0_18px_rgba(245,215,110,0.35)]"
                    }
                    transition-all duration-300 transform
                    ${isExpanded ? "scale-125" : ""}
                  `}
                >
                  <Icon size={22} strokeWidth={2} />
                </div>

                <div
                  className={`
                    absolute top-[68px] left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[13px] font-semibold tracking-wide
                    transition-all duration-300
                    ${isExpanded ? "text-[#F5E6A8] scale-110" : "text-[#F5E6A8]"}
                  `}
                  style={{
                    textShadow: "0 0 12px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border border-[#F5D76E]/25 rounded-lg shadow-xl shadow-[#F5D76E]/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#F5D76E]/50"></div>
                    <div className="flex flex-col space-y-1.5 p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "INCLUDED"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </span>
                        <span className="text-[10px] font-mono text-[#F5E6A8]/50 tracking-wider">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold leading-none tracking-tight text-[#F5E6A8] mt-2">
                        {item.title}
                      </h3>
                    </div>
                    <div className="px-4 pb-4 text-xs text-[#F5E6A8]/80">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-[#F5D76E]/10">
                        <div className="flex justify-between items-center text-[10px] mb-1 text-[#F5E6A8]/70">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Depth
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#E5B84B] to-[#F5D76E]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#F5D76E]/10">
                          <div className="flex items-center mb-2">
                            <LinkIcon size={10} className="text-[#F5E6A8]/70 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-[#F5E6A8]/70">
                              Linked outputs
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <button
                                  key={relatedId}
                                  type="button"
                                  className="inline-flex items-center h-6 px-2 py-0 text-[10px] rounded border border-[#F5D76E]/20 bg-transparent hover:bg-[#F5D76E]/10 text-[#F5E6A8]/80 hover:text-[#F5E6A8] transition-colors cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-[#F5E6A8]/60"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
