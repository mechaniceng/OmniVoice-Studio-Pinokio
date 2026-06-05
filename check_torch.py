import torch, sys
print('torch', torch.__version__)
print('cuda_available', torch.cuda.is_available())
print('cuda_version', getattr(torch.version, 'cuda', None))
sys.exit(0)
