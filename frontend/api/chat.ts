import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { projects } from './projects.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { projectId, messages } = req.body;
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ response: "API 키가 설정되지 않아 시뮬레이션된 응답입니다. (Vercel 환경 변수에 GEMINI_API_KEY를 설정해주세요.)" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemInstruction = `당신은 ${project.company}의 '${project.title}' 실무 과제를 돕는 보조 AI 어시스턴트 및 현업 사수 역할을 겸합니다. 사용자가 질문하거나 과제 초안을 보내면, 매우 전문적이고 논리적인 피드백을 실무자의 입장에서 제공하세요. 절대 로봇 이모지나 이모티콘을 사용하지 마세요. 군더더기 없는 비즈니스 톤을 유지하세요.`;

    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        { role: 'model', parts: [{ text: '네, 명심하겠습니다.' }] },
        ...history
      ]
    });

    const result = await chat.sendMessage(lastMessage);
    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
}
