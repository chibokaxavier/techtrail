import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label>Upload course label</Label>
          <Input type="file" accept="image/*"  className="cursor-pointer"/>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
