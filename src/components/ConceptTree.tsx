import React from 'react';
import { ArrowLeft, GitBranch, Circle } from 'lucide-react';

interface ConceptTreeProps {
  onBack: () => void;
}

interface TreeNode {
  id: string;
  title: string;
  children?: TreeNode[];
}

const ConceptTree: React.FC<ConceptTreeProps> = ({ onBack }) => {
  // Mock data for the concept tree
  const treeData: TreeNode = {
    id: "math",
    title: "Mathematics",
    children: [
      {
        id: "algebra",
        title: "Algebra",
        children: [
          {
            id: "equations",
            title: "Equations",
            children: [
              { id: "linear", title: "Linear Equations" },
              { id: "quadratic", title: "Quadratic Equations" }
            ]
          },
          {
            id: "functions",
            title: "Functions",
            children: [
              { id: "polynomial", title: "Polynomial Functions" },
              { id: "exponential", title: "Exponential Functions" }
            ]
          }
        ]
      },
      {
        id: "geometry",
        title: "Geometry",
        children: [
          {
            id: "triangles",
            title: "Triangles",
            children: [
              { id: "right", title: "Right Triangles" },
              { id: "similar", title: "Similar Triangles" }
            ]
          }
        ]
      }
    ]
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    return (
      <div key={node.id} className={`ml-${level * 8}`}>
        <div className="flex items-center py-2 group">
          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 group-hover:bg-purple-500/40 transition-colors">
            <Circle className="w-3 h-3" />
          </div>
          <span className="text-lg group-hover:text-purple-300 transition-colors">{node.title}</span>
        </div>
        {node.children && (
          <div className="ml-3 pl-8 border-l-2 border-purple-500/20">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-purple-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <GitBranch className="w-8 h-8 mr-3 text-purple-400" />
          <h1 className="text-4xl font-bold">Concept Tree</h1>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          {renderNode(treeData)}
        </div>
      </div>
    </div>
  );
};

export default ConceptTree;