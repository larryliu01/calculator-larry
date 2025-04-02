
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-slate-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Simple Calculator</h1>
      <Calculator />
    </div>
  );
};

export default Index;
