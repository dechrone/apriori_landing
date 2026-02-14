"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button, IconButton } from "@/components/ui/Button";
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";

export type LogicalOperator = "AND" | "OR";

export type FieldCategory =
  | "demographics"
  | "geography"
  | "socioeconomic"
  | "behavioral"
  | "psychographic"
  | "digital";

export interface FilterField {
  id: string;
  label: string;
  category: FieldCategory;
  type: "string" | "number" | "boolean" | "enum";
  options?: { value: string; label: string }[];
}

export type ConditionOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "between"
  | "in"
  | "not_in"
  | "contains"
  | "not_contains";

export interface ConditionNode {
  id: string;
  type: "condition";
  fieldId: string | null;
  operator: ConditionOperator | null;
  value: unknown;
}

export interface ConditionGroupNode {
  id: string;
  type: "group";
  operator: LogicalOperator;
  children: Array<ConditionNode | ConditionGroupNode>;
}

export type ConditionTreeNode = ConditionNode | ConditionGroupNode;

interface AudienceFilterBuilderProps {
  onChange?: (root: ConditionGroupNode) => void;
}

const FIELD_DEFINITIONS: FilterField[] = [
  // Demographics
  {
    id: "age",
    label: "Age",
    category: "demographics",
    type: "number",
  },
  {
    id: "gender",
    label: "Gender",
    category: "demographics",
    type: "enum",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
      { value: "prefer_not_to_say", label: "Prefer not to say" },
    ],
  },
  {
    id: "education",
    label: "Education level",
    category: "demographics",
    type: "enum",
    options: [
      { value: "below_10th", label: "Below 10th" },
      { value: "10th", label: "10th Pass" },
      { value: "12th", label: "12th Pass" },
      { value: "diploma", label: "Diploma" },
      { value: "graduate", label: "Graduate" },
      { value: "post_graduate", label: "Post Graduate" },
      { value: "professional", label: "Professional Degree" },
    ],
  },
  {
    id: "marital_status",
    label: "Marital status",
    category: "demographics",
    type: "enum",
    options: [
      { value: "single", label: "Single" },
      { value: "married", label: "Married" },
      { value: "divorced", label: "Divorced" },
      { value: "widowed", label: "Widowed" },
    ],
  },
  {
    id: "occupation",
    label: "Occupation",
    category: "demographics",
    type: "enum",
    options: [
      { value: "student", label: "Student" },
      { value: "salaried", label: "Salaried Employee" },
      { value: "self_employed", label: "Self Employed" },
      { value: "business_owner", label: "Business Owner" },
      { value: "homemaker", label: "Homemaker" },
      { value: "retired", label: "Retired" },
      { value: "unemployed", label: "Unemployed" },
    ],
  },
  // Geography
  {
    id: "state",
    label: "State",
    category: "geography",
    type: "enum",
    options: [
      { value: "maharashtra", label: "Maharashtra" },
      { value: "karnataka", label: "Karnataka" },
      { value: "tamil_nadu", label: "Tamil Nadu" },
      { value: "delhi", label: "Delhi" },
      { value: "gujarat", label: "Gujarat" },
      { value: "rajasthan", label: "Rajasthan" },
      { value: "west_bengal", label: "West Bengal" },
      { value: "uttar_pradesh", label: "Uttar Pradesh" },
      { value: "punjab", label: "Punjab" },
      { value: "haryana", label: "Haryana" },
      { value: "kerala", label: "Kerala" },
      { value: "andhra_pradesh", label: "Andhra Pradesh" },
      { value: "telangana", label: "Telangana" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "city_tier",
    label: "City tier",
    category: "geography",
    type: "enum",
    options: [
      { value: "tier_1", label: "Tier 1 (Metro)" },
      { value: "tier_2", label: "Tier 2" },
      { value: "tier_3", label: "Tier 3" },
      { value: "tier_4", label: "Tier 4" },
      { value: "rural", label: "Rural" },
    ],
  },
  {
    id: "region",
    label: "Region",
    category: "geography",
    type: "enum",
    options: [
      { value: "north", label: "North" },
      { value: "south", label: "South" },
      { value: "east", label: "East" },
      { value: "west", label: "West" },
      { value: "central", label: "Central" },
      { value: "northeast", label: "Northeast" },
    ],
  },
  {
    id: "city",
    label: "City",
    category: "geography",
    type: "string",
  },
  // Socioeconomic
  {
    id: "monthly_income",
    label: "Monthly income (₹)",
    category: "socioeconomic",
    type: "number",
  },
  {
    id: "annual_income",
    label: "Annual income (₹)",
    category: "socioeconomic",
    type: "number",
  },
  {
    id: "household_size",
    label: "Household size",
    category: "socioeconomic",
    type: "number",
  },
  {
    id: "income_bracket",
    label: "Income bracket",
    category: "socioeconomic",
    type: "enum",
    options: [
      { value: "below_25k", label: "Below ₹25,000" },
      { value: "25k_50k", label: "₹25,000 - ₹50,000" },
      { value: "50k_1l", label: "₹50,000 - ₹1 Lakh" },
      { value: "1l_2l", label: "₹1 Lakh - ₹2 Lakh" },
      { value: "2l_5l", label: "₹2 Lakh - ₹5 Lakh" },
      { value: "5l_10l", label: "₹5 Lakh - ₹10 Lakh" },
      { value: "above_10l", label: "Above ₹10 Lakh" },
    ],
  },
  // Behavioral
  {
    id: "purchase_frequency",
    label: "Purchase frequency",
    category: "behavioral",
    type: "enum",
    options: [
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "bi_weekly", label: "Bi-weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
      { value: "rarely", label: "Rarely" },
    ],
  },
  {
    id: "last_purchase_days",
    label: "Days since last purchase",
    category: "behavioral",
    type: "number",
  },
  {
    id: "cart_abandonment",
    label: "High cart abandonment",
    category: "behavioral",
    type: "boolean",
  },
  {
    id: "avg_order_value",
    label: "Average order value (₹)",
    category: "behavioral",
    type: "number",
  },
  {
    id: "lifetime_value",
    label: "Customer lifetime value (₹)",
    category: "behavioral",
    type: "number",
  },
  {
    id: "churn_risk",
    label: "High churn risk",
    category: "behavioral",
    type: "boolean",
  },
  // Psychographic
  {
    id: "brand_loyalty",
    label: "Brand loyalty",
    category: "psychographic",
    type: "enum",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ],
  },
  {
    id: "price_sensitivity",
    label: "Price sensitivity",
    category: "psychographic",
    type: "enum",
    options: [
      { value: "low", label: "Low (Premium buyer)" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High (Deal seeker)" },
    ],
  },
  {
    id: "risk_appetite",
    label: "Risk appetite",
    category: "psychographic",
    type: "enum",
    options: [
      { value: "conservative", label: "Conservative" },
      { value: "moderate", label: "Moderate" },
      { value: "aggressive", label: "Aggressive" },
    ],
  },
  // Digital
  {
    id: "primary_device",
    label: "Primary device",
    category: "digital",
    type: "enum",
    options: [
      { value: "android", label: "Android" },
      { value: "ios", label: "iOS" },
      { value: "desktop", label: "Desktop" },
    ],
  },
  {
    id: "payment_app",
    label: "Primary payment app",
    category: "digital",
    type: "enum",
    options: [
      { value: "phonepe", label: "PhonePe" },
      { value: "google_pay", label: "Google Pay" },
      { value: "paytm", label: "Paytm" },
      { value: "amazon_pay", label: "Amazon Pay" },
      { value: "cred", label: "CRED" },
      { value: "bhim_upi", label: "BHIM UPI" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "ecommerce_platform",
    label: "Preferred e-commerce platform",
    category: "digital",
    type: "enum",
    options: [
      { value: "amazon", label: "Amazon" },
      { value: "flipkart", label: "Flipkart" },
      { value: "meesho", label: "Meesho" },
      { value: "myntra", label: "Myntra" },
      { value: "nykaa", label: "Nykaa" },
      { value: "jiomart", label: "JioMart" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "internet_type",
    label: "Primary internet connection",
    category: "digital",
    type: "enum",
    options: [
      { value: "4g", label: "4G Mobile" },
      { value: "5g", label: "5G Mobile" },
      { value: "wifi", label: "WiFi" },
      { value: "broadband", label: "Broadband" },
    ],
  },
  {
    id: "language_preference",
    label: "Language preference",
    category: "digital",
    type: "enum",
    options: [
      { value: "hindi", label: "Hindi" },
      { value: "english", label: "English" },
      { value: "tamil", label: "Tamil" },
      { value: "telugu", label: "Telugu" },
      { value: "marathi", label: "Marathi" },
      { value: "gujarati", label: "Gujarati" },
      { value: "bengali", label: "Bengali" },
      { value: "kannada", label: "Kannada" },
      { value: "malayalam", label: "Malayalam" },
      { value: "punjabi", label: "Punjabi" },
      { value: "other", label: "Other" },
    ],
  },
];

function createEmptyCondition(id: string): ConditionNode {
  return {
    id,
    type: "condition",
    fieldId: null,
    operator: null,
    value: "",
  };
}

function createEmptyGroup(id: string, childId: string): ConditionGroupNode {
  return {
    id,
    type: "group",
    operator: "AND",
    children: [createEmptyCondition(childId)],
  };
}

export function AudienceFilterBuilder({ onChange }: AudienceFilterBuilderProps) {
  const [idCounter, setIdCounter] = useState(3);
  const [expanded, setExpanded] = useState(true);
  const [root, setRoot] = useState<ConditionGroupNode>(() =>
    createEmptyGroup("group-1", "cond-1")
  );

  useEffect(() => {
    onChange?.(root);
  }, [root, onChange]);

  const fieldsById = useMemo(() => {
    const map = new Map<string, FilterField>();
    FIELD_DEFINITIONS.forEach((f) => map.set(f.id, f));
    return map;
  }, []);

  const categoryLabel: Record<FieldCategory, string> = {
    demographics: "Demographics",
    geography: "Geography",
    socioeconomic: "Socioeconomic",
    behavioral: "Behavioral",
    psychographic: "Psychographic",
    digital: "Digital",
  };

  const numberOperators: { value: ConditionOperator; label: string }[] = [
    { value: "eq", label: "is" },
    { value: "neq", label: "is not" },
    { value: "gt", label: ">" },
    { value: "gte", label: ">=" },
    { value: "lt", label: "<" },
    { value: "lte", label: "<=" },
    { value: "between", label: "is between" },
  ];

  const stringOperators: { value: ConditionOperator; label: string }[] = [
    { value: "eq", label: "is" },
    { value: "neq", label: "is not" },
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
    { value: "in", label: "is any of (comma separated)" },
    { value: "not_in", label: "is none of (comma separated)" },
  ];

  const booleanOperators: { value: ConditionOperator; label: string }[] = [
    { value: "eq", label: "is" },
    { value: "neq", label: "is not" },
  ];

  function nextId(prefix: "group" | "cond") {
    setIdCounter((prev) => prev + 1);
    return `${prefix}-${idCounter + 1}`;
  }

  function updateTree(updater: (node: ConditionGroupNode) => ConditionGroupNode) {
    setRoot((prev) => updater(prev));
  }

  function updateNode(
    node: ConditionTreeNode,
    targetId: string,
    updater: (node: ConditionTreeNode) => ConditionTreeNode
  ): ConditionTreeNode {
    if (node.id === targetId) {
      return updater(node);
    }
    if (node.type === "group") {
      return {
        ...node,
        children: node.children.map((child) =>
          updateNode(child, targetId, updater)
        ),
      };
    }
    return node;
  }

  function removeNode(node: ConditionTreeNode, targetId: string): ConditionTreeNode | null {
    if (node.id === targetId) {
      return null;
    }
    if (node.type === "group") {
      const filteredChildren = node.children
        .map((child) => removeNode(child, targetId))
        .filter((child): child is ConditionTreeNode => child !== null);

      // never allow a group without children – ensure at least one condition exists
      if (filteredChildren.length === 0) {
        const newCond = createEmptyCondition(nextId("cond"));
        return { ...node, children: [newCond] };
      }

      return { ...node, children: filteredChildren };
    }
    return node;
  }

  function addCondition(groupId: string) {
    const conditionId = nextId("cond");
    updateTree((rootNode) =>
      updateNode(rootNode, groupId, (node) => {
        if (node.type !== "group") return node;
        return {
          ...node,
          children: [...node.children, createEmptyCondition(conditionId)],
        };
      }) as ConditionGroupNode
    );
  }

  function addGroup(parentGroupId: string) {
    const groupId = nextId("group");
    const condId = nextId("cond");
    const newGroup = createEmptyGroup(groupId, condId);

    updateTree((rootNode) =>
      updateNode(rootNode, parentGroupId, (node) => {
        if (node.type !== "group") return node;
        return {
          ...node,
          children: [...node.children, newGroup],
        };
      }) as ConditionGroupNode
    );
  }

  function handleRemove(nodeId: string) {
    updateTree((rootNode) => removeNode(rootNode, nodeId) as ConditionGroupNode);
  }

  function handleGroupOperatorChange(groupId: string, operator: LogicalOperator) {
    updateTree((rootNode) =>
      updateNode(rootNode, groupId, (node) =>
        node.type === "group" ? { ...node, operator } : node
      ) as ConditionGroupNode
    );
  }

  function handleConditionChange(
    conditionId: string,
    updates: Partial<Pick<ConditionNode, "fieldId" | "operator" | "value">>
  ) {
    updateTree((rootNode) =>
      updateNode(rootNode, conditionId, (node) => {
        if (node.type !== "condition") return node;

        let next: ConditionNode = { ...node, ...updates };

        // reset operator/value when field changes
        if (updates.fieldId && updates.fieldId !== node.fieldId) {
          next = {
            ...next,
            operator: null,
            value: "",
          };
        }

        // reset value when operator switches away from "between"
        if (updates.operator && updates.operator !== node.operator) {
          if (updates.operator === "between") {
            next = { ...next, value: { from: "", to: "" } };
          } else if (node.operator === "between") {
            next = { ...next, value: "" };
          }
        }

        return next;
      }) as ConditionGroupNode
    );
  }

  function renderValueInput(condition: ConditionNode, field: FilterField | undefined) {
    if (!field || !condition.operator) {
      return (
        <Input
          placeholder="Select a field and operator first"
          disabled
        />
      );
    }

    if (field.type === "boolean") {
      return (
        <Select
          value={
            condition.value === true
              ? "true"
              : condition.value === false
              ? "false"
              : ""
          }
          onChange={(e) =>
            handleConditionChange(condition.id, {
              value: e.target.value === "true",
            })
          }
          options={[
            { value: "", label: "Select…" },
            { value: "true", label: "True" },
            { value: "false", label: "False" },
          ]}
        />
      );
    }

    if (field.type === "number" && condition.operator === "between") {
      const current =
        typeof condition.value === "object" && condition.value !== null
          ? (condition.value as { from?: string; to?: string })
          : { from: "", to: "" };
      return (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={current.from ?? ""}
            onChange={(e) =>
              handleConditionChange(condition.id, {
                value: { ...current, from: e.target.value },
              })
            }
          />
          <span className="text-body-sm text-text-tertiary">and</span>
          <Input
            type="number"
            placeholder="Max"
            value={current.to ?? ""}
            onChange={(e) =>
              handleConditionChange(condition.id, {
                value: { ...current, to: e.target.value },
              })
            }
          />
        </div>
      );
    }

    if (field.type === "enum") {
      const opts = field.options ?? [];
      return (
        <Select
          value={typeof condition.value === "string" ? condition.value : ""}
          onChange={(e) =>
            handleConditionChange(condition.id, { value: e.target.value })
          }
          options={[{ value: "", label: "Select…" }, ...opts]}
        />
      );
    }

    // string/number free text, including comma-separated multi-value for "in"/"not_in"
    return (
      <Input
        type={field.type === "number" ? "number" : "text"}
        placeholder={
          condition.operator === "in" || condition.operator === "not_in"
            ? "Comma‑separated values"
            : field.type === "number"
            ? "Enter a number"
            : "Enter a value"
        }
        value={typeof condition.value === "string" ? condition.value : ""}
        onChange={(e) =>
          handleConditionChange(condition.id, { value: e.target.value })
        }
      />
    );
  }

  function renderGroup(node: ConditionGroupNode, depth: number, isRoot = false) {
    const description =
      node.operator === "AND"
        ? "Match ALL of the following"
        : "Match ANY of the following";

    return (
      <div
        key={node.id}
        className={`border border-border-subtle rounded-lg bg-bg-secondary ${
          depth > 0 ? "ml-4" : ""
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-bg-elevated/60">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-body-sm text-text-tertiary"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
              <span className="uppercase tracking-wide text-label text-text-quaternary">
                {isRoot ? "Root group" : "Nested group"}
              </span>
            </button>
            <div className="inline-flex rounded-full border border-border-subtle bg-bg-primary text-caption overflow-hidden">
              <button
                type="button"
                className={`px-3 py-1 ${
                  node.operator === "AND"
                    ? "bg-accent-blue/10 text-accent-blue"
                    : "text-text-secondary"
                }`}
                onClick={() => handleGroupOperatorChange(node.id, "AND")}
              >
                AND
              </button>
              <button
                type="button"
                className={`px-3 py-1 border-l border-border-subtle ${
                  node.operator === "OR"
                    ? "bg-accent-blue/10 text-accent-blue"
                    : "text-text-secondary"
                }`}
                onClick={() => handleGroupOperatorChange(node.id, "OR")}
              >
                OR
              </button>
            </div>
            <span className="text-body-sm text-text-tertiary">{description}</span>
          </div>
          {!isRoot && (
            <IconButton
              icon={<Trash2 className="w-4 h-4" />}
              label="Remove group"
              className="w-8 h-8"
              onClick={() => handleRemove(node.id)}
            />
          )}
        </div>

        {expanded && (
          <div className="p-4 space-y-3">
            {node.children.map((child) =>
              child.type === "condition" ? (
                <div
                  key={child.id}
                  className="flex flex-col md:flex-row md:items-center gap-3 border border-border-subtle rounded-md bg-bg-primary/60 px-3 py-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 flex-1">
                    <div className="min-w-[160px] md:w-1/4">
                      <Select
                        value={child.fieldId ?? ""}
                        onChange={(e) =>
                          handleConditionChange(child.id, {
                            fieldId: e.target.value || null,
                          })
                        }
                        options={[
                          { value: "", label: "Select field…" },
                          ...FIELD_DEFINITIONS.map((field) => ({
                            value: field.id,
                            label: `${categoryLabel[field.category]} · ${field.label}`,
                          })),
                        ]}
                      />
                    </div>
                    <div className="min-w-[140px] md:w-1/4">
                      <Select
                        value={child.operator ?? ""}
                        onChange={(e) =>
                          handleConditionChange(child.id, {
                            operator: e.target.value as ConditionOperator,
                          })
                        }
                        options={(() => {
                          const field = child.fieldId
                            ? fieldsById.get(child.fieldId)
                            : undefined;
                          if (!field) {
                            return [
                              { value: "", label: "Select operator…" },
                            ];
                          }
                          let ops = stringOperators;
                          if (field.type === "number") ops = numberOperators;
                          if (field.type === "boolean") ops = booleanOperators;
                          return [
                            { value: "", label: "Select operator…" },
                            ...ops,
                          ];
                        })()}
                      />
                    </div>
                    <div className="flex-1">
                      {renderValueInput(
                        child,
                        child.fieldId ? fieldsById.get(child.fieldId) : undefined
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <IconButton
                      icon={<Trash2 className="w-4 h-4" />}
                      label="Remove condition"
                      className="w-8 h-8"
                      onClick={() => handleRemove(child.id)}
                    />
                  </div>
                </div>
              ) : (
                renderGroup(child, depth + 1)
              )
            )}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => addCondition(node.id)}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add condition
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addGroup(node.id)}
              >
                + Nested group
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        <div>
          <p className="text-label text-text-quaternary uppercase tracking-wide mb-1">
            Audience filters
          </p>
          <p className="text-body-sm text-text-tertiary">
            Build a dynamic segment over the Indian consumer dataset. Combine demographics,
            geography, income, purchase behavior, and digital preferences with AND / OR logic and nested groups.
          </p>
        </div>
        {renderGroup(root, 0, true)}
      </CardContent>
    </Card>
  );
}

