<template>
  <el-row>
    <el-col :span="8">
      <RouterLink to="/create">{{ __('Create') }}</RouterLink>
    </el-col>
    <el-col :span="8">
      <RouterLink to="/edit">{{ __('View/Edit') }}</RouterLink>
    </el-col>
    <el-col :span="8">
      <RouterLink to="/about">{{ __('About') }}</RouterLink>
    </el-col>
  </el-row>
</template>
