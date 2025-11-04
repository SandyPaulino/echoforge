import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TextUpload } from '@/components/upload/text-upload'
import { FileUpload } from '@/components/upload/file-upload'
import { UrlImport } from '@/components/upload/url-import'
import { UploadIcon, FileText, Link } from 'lucide-react'

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Content</h1>
        <p className="text-muted-foreground mt-2">
          Start by uploading your source content. We support text, files, and URLs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Source</CardTitle>
          <CardDescription>
            Select how you want to provide your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2">
                <UploadIcon className="h-4 w-4" />
                File
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-6">
              <TextUpload />
            </TabsContent>

            <TabsContent value="file" className="mt-6">
              <FileUpload />
            </TabsContent>

            <TabsContent value="url" className="mt-6">
              <UrlImport />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}



