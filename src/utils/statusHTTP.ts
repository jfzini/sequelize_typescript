import StatusHTTP from '../types/StatusHTTP';

const mapStatus = (status: keyof typeof StatusHTTP): number => StatusHTTP[status];

export default mapStatus;