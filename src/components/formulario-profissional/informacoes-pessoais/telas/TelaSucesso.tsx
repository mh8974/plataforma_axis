import React from "react";
import { Heart } from "lucide-react";
import Card from "@/components/ui/Card";

const TelaSucesso: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Informações salvas com sucesso!
          </h2>
          <p className="text-neutral-600 mb-6">
            Estamos redirecionando você para a página de login...
          </p>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TelaSucesso;