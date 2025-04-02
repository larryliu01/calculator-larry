
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-slate-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">HTML Calculator</h1>
      <Calculator />
      <div className="mt-8 text-sm text-gray-500">
        Simple calculator built with HTML-style elements and React
      </div>
    </div>
  );
};

export default Index;
